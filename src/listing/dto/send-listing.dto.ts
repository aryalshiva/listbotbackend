import { IsIn } from "class-validator";
import { ApiProperty } from "@nestjs/swagger"; 
import { UpdateListingDto } from "./update-listing.dto";

export class SendStatusDto extends UpdateListingDto {
    @ApiProperty({ description: 'Send status of the listing', enum: ['notYet', 'sendToAdmin'] })
    @IsIn(['notYet', 'sendToAdmin'])
    sendStatus: string;
}
