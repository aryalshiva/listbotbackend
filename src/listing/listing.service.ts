import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ListingEntity } from './entities/listing.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';


@Injectable()
export class ListingService {
constructor(@InjectRepository(ListingEntity) private readonly listingRepository:Repository<ListingEntity>){}
  

async create(createListingDto: CreateListingDto,currentUser:UserEntity):Promise <ListingEntity> {
    const listing= this.listingRepository.create(createListingDto);
    listing.addedBy=currentUser;
    return await this.listingRepository.save(listing)

  }

  async findAll() {
    return await this.listingRepository.find();
  }

  // to retrieve listing from id one by one 
  async findOne(id: number) {
    return await this.listingRepository.findOneBy({id});
  }

  async update(id: number, fields:Partial <UpdateListingDto>) {
    const listing=await this.findOne(id);
    if(!listing)throw new NotFoundException('listing not found');
    Object.assign(listing,fields);

    return await this.listingRepository.save(listing);
  }

  remove(id: number) {
    return `This action removes a #${id} listing`;
  }
}
