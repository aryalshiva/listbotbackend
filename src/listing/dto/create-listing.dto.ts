import { IsNotEmpty, IsUrl, IsString, IsIn, Matches, IsOptional } from "class-validator";

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

    @IsOptional()
    @IsUrl({}, { message: 'Image must be a valid URL' })
    image?: string;

    @IsOptional()
    @IsIn(['notSent', 'pending', 'approved', 'rejected'], { message: 'Approval status must be one of "notSent", "pending", "approved", or "rejected"' })
    approvalStatus: string;

    @IsOptional()
    @IsIn(['notYet', 'sendToAdmin'], { message: 'Send status must be either "notYet" or "sendToAdmin"' })
    sendStatus: string;

}
