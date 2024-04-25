import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Roles } from "src/utility/common/user-roles.enum"

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    name:string;
    @Column()
    email:string;
    @Column()
    password:string;
    @Column({type:'enum',enum:Roles})
    roles:Roles[]
    

}
