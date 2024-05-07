import { Injectable } from '@nestjs/common';
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

  findAll() {
    return `This action returns all listing`;
  }

  // to retrieve listing from id one by one 
  async findOne(id: number) {
    return await this.listingRepository.findOneBy({id});
  }

  update(id: number, updateListingDto: UpdateListingDto) {
    return `This action updates a #${id} listing`;
  }

  remove(id: number) {
    return `This action removes a #${id} listing`;
  }
}
