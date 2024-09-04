import { User } from "src/users/entities/user.entity"
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id:number
    
    @Column()
    title:string

    @Column()
    description:string
    
    @Column()
    authorID:number

    @ManyToOne(()=>User, user=>user.tasks)
    author:User
}
