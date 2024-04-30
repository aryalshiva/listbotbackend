import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { UserSignUpDto } from './dto/user-signup.dto';
import { hash } from 'bcrypt';
import { UserSignInDto } from './dto/user-signin.dto';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async signup(userSignUpDto:UserSignUpDto):Promise<UserEntity>{
    const userExist=await this.findUserByEmail(userSignUpDto.email)
    if(userExist) throw new BadRequestException('Email is not available.')
    userSignUpDto.password=await hash(userSignUpDto.password,10)

    let user=this .usersRepository.create(userSignUpDto);
    user=await this.usersRepository.save(user);
    //here user save the info in user then implement delete password on it 
    delete user.password
    return user;
  }

  async signin(userSignInDto:UserSignInDto){
    const userExist=await this.usersRepository.createQueryBuilder('users').addSelect('users.password').where('users.email=email',{email:userSignInDto.email}).getOne();
      return userExist;
    }
  
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findUserByEmail(email:string){
    return await this.usersRepository.findOneBy({email});
  }
}
