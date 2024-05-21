import { IsIn } from "class-validator";
import { ApiProperty } from "@nestjs/swagger"; 
import { UpdateListingDto } from "./update-listing.dto";

export class ApprovalStatusDto extends UpdateListingDto {
    @ApiProperty({ description: 'Approval status of the listing', enum: ['notSent', 'pending', 'approved', 'rejected'] })
    @IsIn(['notSent', 'pending', 'approved', 'rejected'])
    approvalStatus: string;
}
