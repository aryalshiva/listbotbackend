import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ListingService } from './listing.service';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';
import { CurrentUser } from 'src/utility/decorators/current-user.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { AuthenticationGuard } from 'src/utility/guards/authentication.guard';
import { ListingEntity } from './entities/listing.entity';
import { SendStatusDto } from './dto/send-listing.dto';
import { ApprovalStatusDto } from './dto/approved-listing.dto';
import { AuthorizeGuard } from 'src/utility/guards/authorization.guard';
import { Roles } from 'src/utility/common/user-roles.enum';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Listing')
@ApiBearerAuth()
@Controller('listing')
export class ListingController {
  constructor(private readonly listingService: ListingService) {}

  //  for creating a listing
  @Post()
  @UseGuards(AuthenticationGuard)
  @ApiOperation({ summary: 'Create a new listing' })
  @ApiResponse({ status: 201, description: 'The listing has been successfully created.', type: ListingEntity })
  async create(@Body() createListingDto: CreateListingDto, @CurrentUser() currentUser: UserEntity): Promise<ListingEntity> {
    return await this.listingService.create(createListingDto, currentUser);
  }

  //  for retrieving all listings
  @Get()
  @ApiOperation({ summary: 'Retrieve all listings' })
  @ApiResponse({ status: 200, description: 'List of all listings', type: [ListingEntity] })
  async findAll(): Promise<ListingEntity[]> {
    return await this.listingService.findAll();
  }

  //  for retrieving listings pending approval (admin only)
  @Get('forApproval')
  @UseGuards(AuthenticationGuard, AuthorizeGuard([Roles.ADMIN]))
  @ApiOperation({ summary: 'Retrieve listings pending approval (admin only)' })
  @ApiResponse({ status: 200, description: 'List of listings pending approval', type: [ListingEntity] })
  async findAllForApproval(): Promise<ListingEntity[]> {
    return await this.listingService.findAllForApproval();
  }

  //  for retrieving approved listings (admin only)
  @Get('approved')
  @UseGuards(AuthenticationGuard, AuthorizeGuard([Roles.ADMIN]))
  @ApiOperation({ summary: 'Retrieve approved listings (admin only)' })
  @ApiResponse({ status: 200, description: 'List of approved listings', type: [ListingEntity] })
  async findAllApproved(): Promise<ListingEntity[]> {
    return await this.listingService.findAllApproved();
  }

  //  for retrieving rejected listings (admin only)
  @Get('rejected')
  @UseGuards(AuthenticationGuard, AuthorizeGuard([Roles.ADMIN]))
  @ApiOperation({ summary: 'Retrieve rejected listings (admin only)' })
  @ApiResponse({ status: 200, description: 'List of rejected listings', type: [ListingEntity] })
  async findAllRejected(): Promise<ListingEntity[]> {
    return await this.listingService.findAllRejected();
  }

  //  for retrieving pending listings (admin only)
  @Get('pending')
  @UseGuards(AuthenticationGuard, AuthorizeGuard([Roles.ADMIN]))
  @ApiOperation({ summary: 'Retrieve pending listings (admin only)' })
  @ApiResponse({ status: 200, description: 'List of pending listings', type: [ListingEntity] })
  async findAllPending(): Promise<ListingEntity[]> {
    return await this.listingService.findAllPending();
  }

  //  for retrieving current user's listings pending approval
  @Get('current/forApproval')
  @UseGuards(AuthenticationGuard)
  @ApiOperation({ summary: 'Retrieve current user\'s listings pending approval' })
  @ApiResponse({ status: 200, description: 'List of current user\'s listings pending approval', type: [ListingEntity] })
  async findCurrentApproval(@CurrentUser() currentUser: UserEntity): Promise<ListingEntity[]> {
    return await this.listingService.findCurrentApproval(currentUser.id);
  }

  //  for retrieving current user's approved listings
  @Get('current/approved')
  @UseGuards(AuthenticationGuard)
  @ApiOperation({ summary: 'Retrieve current user\'s approved listings' })
  @ApiResponse({ status: 200, description: 'List of current user\'s approved listings', type: [ListingEntity] })
  async findCurrentApproved(@CurrentUser() currentUser: UserEntity): Promise<ListingEntity[]> {
    return await this.listingService.findCurrentApproved(currentUser.id);
  }

  //  for retrieving current user's rejected listings
  @Get('current/rejected')
  @UseGuards(AuthenticationGuard)
  @ApiOperation({ summary: 'Retrieve current user\'s rejected listings' })
  @ApiResponse({ status: 200, description: 'List of current user\'s rejected listings', type: [ListingEntity] })
  async findCurrentRejected(@CurrentUser() currentUser: UserEntity): Promise<ListingEntity[]> {
    return await this.listingService.findCurrentRejected(currentUser.id);
  }

  //  for retrieving current user's pending listings
  @Get('current/pending')
  @UseGuards(AuthenticationGuard)
  @ApiOperation({ summary: 'Retrieve current user\'s pending listings' })
  @ApiResponse({ status: 200, description: 'List of current user\'s pending listings', type: [ListingEntity] })
  async findCurrentPending(@CurrentUser() currentUser: UserEntity): Promise<ListingEntity[]> {
    return await this.listingService.findCurrentPending(currentUser.id);
  }

  //  for retrieving a specific listing by ID
  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a specific listing by ID' })
  @ApiResponse({ status: 200, description: 'The found listing', type: ListingEntity })
  async findOne(@Param('id') id: string): Promise<ListingEntity> {
    return await this.listingService.findOne(+id);
  }
  @Patch('update/:id')
  @UseGuards(AuthenticationGuard)
  @ApiOperation({ summary: 'Update a listing after it has been sent to admin' })
  @ApiResponse({ status: 200, description: 'The updated listing', type: ListingEntity })
  async updateAfterSendToAdmin(@Param('id') id: string, @Body() updateListingDto: UpdateListingDto): Promise<ListingEntity> {
    return await this.listingService.updateAfterSendToAdmin(+id, updateListingDto);
  }
  
  @ApiTags('admin')
  @UseGuards(AuthenticationGuard,AuthorizeGuard([Roles.ADMIN]))
  @Patch(':id')
  @ApiOperation({ summary: 'Update a listing (admin only)' })
  @ApiResponse({ status: 200, description: 'The updated listing', type: ListingEntity })
  async update(@Param('id') id: string, @Body() updateListingDto: UpdateListingDto):Promise<ListingEntity > {
    return await this.listingService.update(+id, updateListingDto);
  }
  
  @ApiTags('user')
  @UseGuards(AuthenticationGuard)
  @Patch(':id/sendStatus')
  @ApiOperation({ summary: 'Update the send status of a listing (user only)' })
  @ApiResponse({ status: 200, description: 'The updated listing with new send status', type: ListingEntity })
  async sendApproval(@Param('id') id: string, @Body() sendStatusDto: SendStatusDto): Promise<ListingEntity> {
    return await this.listingService.updateSendStatus(+id , sendStatusDto );
  }
  
  @ApiTags('admin')
  @UseGuards(AuthenticationGuard,AuthorizeGuard([Roles.ADMIN]))
  @Patch(':id/approvedStatus')
  @ApiOperation({ summary: 'Update the approval status of a listing (admin only)' })
  @ApiResponse({ status: 200, description: 'The updated listing with new approval status', type: ListingEntity })
  async ApprovalStatus(@Param('id') id: string,@Body() approvalStatusDto: ApprovalStatusDto ):Promise<ListingEntity>{
    return await this.listingService.update(+id ,approvalStatusDto)
  }
  
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a listing' })
  @ApiResponse({ status: 200, description: 'The listing has been successfully deleted' })
  remove(@Param('id') id: string) {
    return this.listingService.remove(+id);
  }
}
