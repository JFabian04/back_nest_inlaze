import { Comment } from 'src/modules/comment/entities/comment.entity';
import { Project } from 'src/modules/project/entities/project.entity';
import { Task } from 'src/modules/task/entities/task.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
  } from 'typeorm';
  
  
  @Entity('users')
  export class User {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    username: string;
  
    @Column()
    email: string;
  
    @Column()
    password: string;
  
    @OneToMany(() => Project, (project) => project.user)
    projects: Project[];
  
    @OneToMany(() => Task, (task) => task.assignedTo)
    tasks: Task[];
  
    @OneToMany(() => Comment, (comment) => comment.user)
    comments: Comment[];
  }
  