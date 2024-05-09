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

  @Get(':id')
  async findOne(@Param('id') id: string):Promise<ListingEntity> {
    return await this.listingService.findOne(+id);
  }

  @UseGuards(AuthenticationGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateListingDto: UpdateListingDto):Promise<ListingEntity > {
    return await this.listingService.update(+id, updateListingDto);
  }

    // Update sendApproval only
    @UseGuards(AuthenticationGuard)
    @Patch(':id/sendStatus')
    async sendApproval(@Param('id') id: string, @Body() sendStatusDto: SendStatusDto): Promise<ListingEntity> {
      return await this.listingService.update(+id , sendStatusDto);
    }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.listingService.remove(+id);
  }
}
