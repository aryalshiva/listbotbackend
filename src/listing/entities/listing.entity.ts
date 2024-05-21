import { UserEntity } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: 'listings' })
export class ListingEntity {
    @PrimaryGeneratedColumn()
    @ApiProperty({ description: 'The unique identifier of the listing' })
    id: number;

    @Column()
    @ApiProperty({ description: 'The title of the listing' })
    title: string;

    @Column()
    @ApiProperty({ description: 'The subtitle of the listing' })
    subTitle: string;

    @Column()
    @ApiProperty({ description: 'The description of the listing' })
    description: string;

    @Column()
    @ApiProperty({ description: 'The URL of the listing' })
    url: string;

    @Column()
    @ApiProperty({ description: 'The URL of the image associated with the listing' })
    image: string;

    @Column({ type: 'enum', enum: ['notSent', 'pending', 'approved', 'rejected'], default: 'notSent' })
    @ApiProperty({ description: 'Approval status of the listing', enum: ['notSent', 'pending', 'approved', 'rejected'] })
    approvalStatus: string;

    @Column({ type: 'enum', enum: ['notYet', 'sendToAdmin'], default: 'notYet' })
    @ApiProperty({ description: 'Send status of the listing', enum: ['notYet', 'sendToAdmin'] })
    sendStatus: string;

    @CreateDateColumn({ type: 'timestamp' }) 
    @ApiProperty({ description: 'The timestamp when the listing was created' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' }) 
    @ApiProperty({ description: 'The timestamp when the listing was last updated' })
    updatedAt: Date; 

    @ManyToOne(() => UserEntity, (user) => user.listings)
    addedBy: UserEntity;
}