import { Task } from "src/tasks/entities/task.entity"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id:number

    @Column({unique:true})
    username:string
    
    @Column()
    password:string
    
    @Column({ type: 'datetime', default:()=>'CURRENT_TIMESTAMP'})
    dateregister:Date

    @OneToMany(()=>Task, task=>task.author)
    tasks:Task[]
}
