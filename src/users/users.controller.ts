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

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  async signup(@Body()userSignUpDto:UserSignUpDto):Promise<{user:UserEntity}>{
    return {user:await this.usersService.signup(userSignUpDto)};
    
  }

  @Post('signin')
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
  @UseGuards(AuthenticationGuard,AuthorizeGuard([Roles.ADMIN]))
  @Get('all')
  async findAll(): Promise<UserEntity[]> {
    return await this.usersService.findAll();
  }

  @Get('single/:id')
  async findOne(@Param('id') id: string): Promise<UserEntity> {
    return await this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  //current user can delete his own information 
  @UseGuards(AuthenticationGuard)
  @Delete('me/:id')
  async removeMe(@Param('id') id: string, @CurrentUser() currentUser: UserEntity): Promise<void> {
    if (currentUser.id !== +id) {
      throw new BadRequestException('You can only delete your own account.');
    }
    await this.usersService.remove(currentUser.id);
  }

  //admin user can delete any user by id 
  @UseGuards(AuthenticationGuard,AuthorizeGuard([Roles.ADMIN]))
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.usersService.remove(+id);
  }

  @UseGuards(AuthenticationGuard)
  @Get('me')
  getProfile(@CurrentUser() currentUser:UserEntity){
    return currentUser;
  }


}
