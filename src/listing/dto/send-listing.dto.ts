import { IsIn } from "class-validator";
import { UpdateListingDto } from "./update-listing.dto";

export class SendStatusDto extends UpdateListingDto{
    @IsIn(['notYet', 'sendToAdmin'])
    sendStatus: string;
}