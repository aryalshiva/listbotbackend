import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ListingService } from './listing.service';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';
import { CurrentUser } from 'src/utility/decorators/current-user.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { AuthenticationGuard } from 'src/utility/guards/authentication.guard';
import { promises } from 'dns';
import { ListingEntity } from './entities/listing.entity';
import { SendStatusDto } from './dto/send-listing.dto';
import { ApprovalStatusDto } from './dto/approved-listing.dto';
import { AuthorizeGuard } from 'src/utility/guards/authorization.guard';
import { Roles } from 'src/utility/common/user-roles.enum';

@Controller('listing')
export class ListingController {
  constructor(private readonly listingService: ListingService) {}

  //both user can create website listing so i have not added role specific 
  @UseGuards(AuthenticationGuard)
  @Post()
  async create(@Body() createListingDto: CreateListingDto, @CurrentUser() currentUser:UserEntity):Promise<ListingEntity>{
    return await this.listingService.create(createListingDto,currentUser);
  }

  @Get()
  async findAll():Promise<ListingEntity[]> {
    return await this.listingService.findAll();
  }

  //this is for the admin user 
  @UseGuards(AuthenticationGuard,AuthorizeGuard([Roles.ADMIN]))
  @Get('forApproval')
  async findAllForApproval():Promise<ListingEntity[]>{
    return await this.listingService.findAllForApproval();
  }

  @UseGuards(AuthenticationGuard,AuthorizeGuard([Roles.ADMIN]))
  @Get('approved')
  async findAllApproved(): Promise<ListingEntity[]> {
    return await this.listingService.findAllApproved();
  }

  @UseGuards(AuthenticationGuard,AuthorizeGuard([Roles.ADMIN]))
  @Get('rejected')
  async findAllRejected(): Promise<ListingEntity[]> {
    return await this.listingService.findAllRejected();
  }

  @UseGuards(AuthenticationGuard,AuthorizeGuard([Roles.ADMIN]))
  @Get('pending')
  async findAllPending(): Promise<ListingEntity[]> {
    return await this.listingService.findAllPending();
  }

//this is for the normal user  
  @UseGuards(AuthenticationGuard)
  @Get('current/forApproval')
  async findCurrentApproval(@CurrentUser() currentUser: UserEntity): Promise<ListingEntity[]> {
    return await this.listingService.findCurrentApproval(currentUser.id);
  }

  @UseGuards(AuthenticationGuard)
  @Get('current/approved')
  async findCurrentApproved(@CurrentUser() currentUser: UserEntity): Promise<ListingEntity[]> {
    return await this.listingService.findCurrentApproved(currentUser.id);
  }

  @UseGuards(AuthenticationGuard)
  @Get('current/rejected')
  async findCurrentRejected(@CurrentUser() currentUser: UserEntity): Promise<ListingEntity[]> {
    return await this.listingService.findCurrentRejected(currentUser.id);
  }

  @UseGuards(AuthenticationGuard)
  @Get('current/pending')
  async findCurrentPending(@CurrentUser() currentUser: UserEntity): Promise<ListingEntity[]> {
    return await this.listingService.findCurrentPending(currentUser.id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string):Promise<ListingEntity> {
    return await this.listingService.findOne(+id);
  }

  @UseGuards(AuthenticationGuard)
  @Patch('update/:id')
  async updateAfterSendToAdmin(@Param('id') id: string, @Body() updateListingDto: UpdateListingDto):Promise<ListingEntity > {
    return await this.listingService.updateAfterSendToAdmin(+id, updateListingDto);
  }


  // this is the admin route admin can directly update 
  @UseGuards(AuthenticationGuard,AuthorizeGuard([Roles.ADMIN]))
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateListingDto: UpdateListingDto):Promise<ListingEntity > {
    return await this.listingService.update(+id, updateListingDto);
  }



    // Update sendApproval only
    @UseGuards(AuthenticationGuard)
    @Patch(':id/sendStatus')
    async sendApproval(@Param('id') id: string, @Body() sendStatusDto: SendStatusDto): Promise<ListingEntity> {
      return await this.listingService.updateSendStatus(+id , sendStatusDto );
    }

    //this is only for the admin can change the approval status 
    @UseGuards(AuthenticationGuard,AuthorizeGuard([Roles.ADMIN]))
    @Patch(':id/approvedStatus')
    async ApprovalStatus(@Param('id') id: string,@Body() approvalStatusDto: ApprovalStatusDto ):Promise<ListingEntity>{
      return await this.listingService.update(+id ,approvalStatusDto)
    }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.listingService.remove(+id);
  }
}
