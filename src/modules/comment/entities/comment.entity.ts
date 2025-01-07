import { Task } from '../../task/entities/task.entity';
import { User } from '../../user/entities/user.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
  } from 'typeorm';
  
  
  @Entity('comments')
  export class Comment {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    content: string;
  
    @ManyToOne(() => Task, (task) => task.comments)
    task: Task;
  
    @ManyToOne(() => User, (user) => user.comments)
    user: User;
  }
  