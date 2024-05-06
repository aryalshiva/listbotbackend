import { IsNotEmpty, IsUrl, IsString, IsIn, Matches } from "class-validator";

export class CreateListingDto {

    @IsNotEmpty({ message: 'Title cannot be empty' })
    @IsString({ message: 'Title must be a string' })
    title: string;

    @IsNotEmpty({ message: 'SubTitle cannot be empty' })
    @IsString({ message: 'SubTitle must be a string' })
    subTitle: string;

    @IsNotEmpty({ message: 'Description cannot be empty' })
    @IsString({ message: 'Description must be a string' })
    description: string;

    @IsNotEmpty({ message: 'URL cannot be empty' })
    @IsUrl({}, { message: 'URL must be a valid URL' })
    url: string;

    @IsNotEmpty({ message: 'Image cannot be empty' })
    @IsIn(['.jpg', '.jpeg', '.png', '.gif'], { message: 'Image must have a valid file extension (.jpg, .jpeg, .png, .gif)' })
   //dont know which one will work so both for now check one 
    // @Matches(/\.(jpg|jpeg|png|gif)$/i, {
    //     message: 'Image must have a valid file extension (.jpg, .jpeg, .png, .gif)',
    // })
    image: string;

}
