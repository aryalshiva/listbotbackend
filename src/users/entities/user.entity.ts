import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, Timestamp } from "typeorm";
import { Roles } from "src/utility/common/user-roles.enum"

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    name:string;
    @Column({unique:true})
    email:string;
    @Column({select:false})
    password:string;
    @Column({type:'enum',enum:Roles,array:true,default:[Roles.USER]})
    roles:Roles[];
    @CreateDateColumn()
    CreateAt:Timestamp;
    @CreateDateColumn()
    UpdatedAt:Timestamp;
    

}
