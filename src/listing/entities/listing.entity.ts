import { UserEntity } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";

@Entity({name:'listings'})
export class ListingEntity {
@PrimaryGeneratedColumn()
id:number;
@Column()
title:string;
@Column()
subTitle:string;
@Column()
description:string;
@Column()
url:string;
@Column()
image:string;
@CreateDateColumn()
createdAt:Timestamp;
@UpdateDateColumn()
updatedAt:Timestamp;

@ManyToOne(()=>UserEntity,(user)=>user.listings)
addedBy:UserEntity


}