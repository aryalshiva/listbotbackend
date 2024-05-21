import { IsEmail, IsNotEmpty, IsString, MinLength, isString } from "class-validator";
import { UserSignInDto } from "./user-signin.dto";
import { ApiProperty } from "@nestjs/swagger";

export class UserSignUpDto extends UserSignInDto{
    @ApiProperty({ example: 'test7', description: 'User name' })
    @IsNotEmpty({message:'Name can not be Null'})
    @IsString({message:'Name should be string'})
    name:string;


}