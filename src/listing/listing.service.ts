import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ListingEntity } from './entities/listing.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { SendStatus } from 'src/utility/common/listing-sendStatus.enum';
import { ApprovalStatus } from 'src/utility/common/listing-approvalStatus.enum';


@Injectable()
export class ListingService {
constructor(@InjectRepository(ListingEntity) private readonly listingRepository:Repository<ListingEntity>){}
  

async create(createListingDto: CreateListingDto,currentUser:UserEntity):Promise <ListingEntity> {
    const listing= this.listingRepository.create(createListingDto);
    listing.addedBy=currentUser;
    return await this.listingRepository.save(listing)

  }

  async findAll():Promise<ListingEntity []> {
    return await this.listingRepository.find();
  }

  ///function to retrieve all findAllForApproval
  async findAllForApproval(): Promise<ListingEntity[]> {
    return await this.listingRepository.find({
       where: {
      sendStatus: SendStatus.SEND_TO_ADMIN ,
      },
    })
  }

    ///function to retrieve all approved 
    async findAllApproved(): Promise<ListingEntity[]> {
      return await this.listingRepository.find({
         where: {
        approvalStatus: ApprovalStatus.APPROVED ,
        },
      })
    }

    ///function to retrieve all rejected
   async findAllRejected(): Promise<ListingEntity[]> {
      return await this.listingRepository.find({
    where: {
    approvalStatus: ApprovalStatus.REJECTED , 
    },
   })
  }

    ///function to retrieve all rejected
    async findAllPending(): Promise<ListingEntity[]> {
      return await this.listingRepository.find({
    where: {
    approvalStatus: ApprovalStatus.PENDING , 
    },
   })
  }





  // to retrieve listing from id one by one 
  async findOne(id: number):Promise<ListingEntity>{
    return await this.listingRepository.findOne({
      where :{id:id},
      //this will add the added by user 
      relations:{addedBy:true},
      //this is to add the following fields
      select:{
        addedBy:{
          id:true,
          name:true,
          email:true
        }
      }


    });
  }

  async update(id: number, fields:Partial <UpdateListingDto>):Promise<ListingEntity> {
    const listing=await this.findOne(id);
    if(!listing)throw new NotFoundException('listing not found');
    Object.assign(listing,fields);

        // If sendStatus is being updated and it's changing to 'sendToAdmin', set approvalStatus to 'pending'
        if ('sendStatus' in fields && fields.sendStatus === 'sendToAdmin') {
          listing.approvalStatus = 'pending';
        }

    return await this.listingRepository.save(listing);
  }

  remove(id: number) {
    return `This action removes a #${id} listing`;
  }
}
