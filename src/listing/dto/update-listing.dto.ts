import { PartialType } from '@nestjs/mapped-types';
import { CreateListingDto } from './create-listing.dto';
import { ApiProperty } from "@nestjs/swagger"; 

export class UpdateListingDto extends PartialType(CreateListingDto) {
    @ApiProperty({ description: 'New status of the listing', enum: ['notSent', 'pending', 'approved', 'rejected'] })
    approvalStatus: string;
}
