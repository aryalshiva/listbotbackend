import { Module } from '@nestjs/common';
import { ListingService } from './listing.service';
import { ListingController } from './listing.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListingEntity } from './entities/listing.entity';

@Module({
  imports:[TypeOrmModule.forFeature([ListingEntity])],
  controllers: [ListingController],
  providers: [ListingService],
})
export class ListingModule {}
