import { IsNotEmpty, IsUrl, IsString, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger"; 

export class CreateListingDto {

    @ApiProperty({ description: 'The title of the listing' })
    @IsNotEmpty({ message: 'Title cannot be empty' })
    @IsString({ message: 'Title must be a string' })
    title: string;

    @ApiProperty({ description: 'The subtitle of the listing' })
    @IsNotEmpty({ message: 'SubTitle cannot be empty' })
    @IsString({ message: 'SubTitle must be a string' })
    subTitle: string;

    @ApiProperty({ description: 'The description of the listing' })
    @IsNotEmpty({ message: 'Description cannot be empty' })
    @IsString({ message: 'Description must be a string' })
    description: string;

    @ApiProperty({ description: 'The URL of the listing' })
    @IsNotEmpty({ message: 'URL cannot be empty' })
    @IsUrl({}, { message: 'URL must be a valid URL' })
    url: string;

    @ApiProperty({ description: 'The URL of the image associated with the listing', required: false })
    @IsOptional()
    @IsUrl({}, { message: 'Image must be a valid URL' })
    image?: string;
}
