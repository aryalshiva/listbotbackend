import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Timestamp } from "typeorm";
import { Roles } from "src/utility/common/user-roles.enum"
import { ListingEntity } from "src/listing/entities/listing.entity";

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column({ select: false })
    password: string;

    @Column({ type: 'enum', enum: Roles, array: true, default: [Roles.USER] })
    roles: Roles[];

    @CreateDateColumn()
    CreateAt: Timestamp;

    @CreateDateColumn()
    UpdatedAt: Timestamp;

    @OneToMany(() => ListingEntity, (list) => list.addedBy, { lazy: true }) // Added { lazy: true }
    listings: Promise<ListingEntity[]>; // Changed type to Promise<ListingEntity[]>
}
