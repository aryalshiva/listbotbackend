import { IsIn } from "class-validator";
import { SendStatusDto } from "./send-listing.dto";
import { UpdateListingDto } from "./update-listing.dto";

export class ApprovalStatusDto extends UpdateListingDto {
    @IsIn(['notSent', 'pending', 'approved', 'rejected'])
    approvalStatus: string;
}
