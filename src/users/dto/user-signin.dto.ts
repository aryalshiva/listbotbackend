import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UserSignInDto{

    @ApiProperty({ example: 'test7@gmail.com', description: 'The email of the user' })
    @IsNotEmpty({message :'email can not be empty '})
    @IsEmail({},{message :'Please provide a valid email '})
    email:string;

    @ApiProperty({ example: '12345', description: 'The password of the user' })
    @IsNotEmpty({message :'Password can not be empty '})
    @MinLength(5,{message :'Password minimum character should be 5.'})
    password:string;
}