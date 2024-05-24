import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserSignUpDto } from './dto/user-signup.dto';
import { UserEntity } from './entities/user.entity';
import { UserSignInDto } from './dto/user-signin.dto';
import { get } from 'https';
import { CurrentUser } from 'src/utility/decorators/current-user.decorator';
import { AuthenticationGuard } from 'src/utility/guards/authentication.guard';
import { AuthorizeRoles } from 'src/utility/decorators/authorize-roles.decorator';
import { Roles } from 'src/utility/common/user-roles.enum';
import { AuthorizeGuard } from 'src/utility/guards/authorization.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Sign up a new user' })
  @ApiResponse({ status: 201, description: 'User successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async signup(@Body()userSignUpDto:UserSignUpDto):Promise<{user:UserEntity}>{
    return {user:await this.usersService.signup(userSignUpDto)};
    
  }

  @Post('signin')
  @ApiOperation({ summary: 'Sign in a user' })
  @ApiResponse({ status: 200, description: 'User successfully signed in.' })
  @ApiResponse({ status: 400, description: 'Bad credentials.' })
  async signin(@Body() UserSignInDto:UserSignInDto): Promise<{
    accessToken: string;
    user: UserEntity;
}>{
    const user= await this. usersService.signin(UserSignInDto);
    const accessToken=await this.usersService.accessToken(user);

    return {accessToken,user}
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    //return this.usersService.create(createUserDto);
    return 'hi'
  }
  //this comment can be used if to declare two guards but authorize role have been implemented improved down code  
 // @AuthorizeRoles(Roles.ADMIN)
 @ApiTags('admin')
 @ApiBearerAuth()
 @AuthorizeRoles(Roles.ADMIN)
  @UseGuards(AuthenticationGuard,AuthorizeGuard([Roles.ADMIN]))
  @Get('all')
  @ApiOperation({ summary: 'Get all users (Admin only)' })
  @ApiResponse({ status: 200, description: 'Return all users.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findAll(): Promise<UserEntity[]> {
    return await this.usersService.findAll();
  }

  @Get('single/:id')
  @ApiOperation({ summary: 'Get a single user by ID' })
  @ApiResponse({ status: 200, description: 'Return a user.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async findOne(@Param('id') id: string): Promise<UserEntity> {
    return await this.usersService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a user by ID' })
  @ApiResponse({ status: 200, description: 'User updated successfully.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  //current user can delete his own information 
  @UseGuards(AuthenticationGuard)
  @Delete('me/:id')
  @ApiOperation({ summary: 'Delete own user account' })
  @ApiResponse({ status: 200, description: 'User account deleted successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async removeMe(@Param('id') id: string, @CurrentUser() currentUser: UserEntity): Promise<void> {
    if (currentUser.id !== +id) {
      throw new BadRequestException('You can only delete your own account.');
    }
    await this.usersService.remove(currentUser.id);
  }


  //this can only delete the user that has not created the listings for the user who has created the listings we need to delete all the listings associated id added by 
  //admin user can delete any user by id 
  // @ApiTags('admin')
  // @ApiBearerAuth()
  // @UseGuards(AuthenticationGuard,AuthorizeGuard([Roles.ADMIN]))
  // @Delete(':id')
  // @ApiOperation({ summary: 'Delete any user account (Admin only)' })
  // @ApiResponse({ status: 200, description: 'User account deleted successfully.' })
  // @ApiResponse({ status: 404, description: 'User not found.' })
  // async remove(@Param('id') id: string): Promise<void> {
  //   await this.usersService.remove(+id);
  // }

  @UseGuards(AuthenticationGuard)
  @Get('me')
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({ status: 200, description: 'Return current user profile.' })
  getProfile(@CurrentUser() currentUser:UserEntity){
    return currentUser;
  }


}
