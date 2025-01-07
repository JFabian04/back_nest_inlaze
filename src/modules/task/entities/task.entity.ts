import { Comment } from '../../comment/entities/comment.entity';
import { Project } from '../../project/entities/project.entity';
import { User } from '../../user/entities/user.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
  } from 'typeorm';

  
  @Entity('tasks')
  export class Task {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    title: string;
  
    @Column()
    description: string;
  
    @Column({ type: 'boolean', default: false })
    completed: boolean;
  
    @ManyToOne(() => Project, (project) => project.tasks)
    project: Project;
  
    @ManyToOne(() => User, (user) => user.tasks)
    assignedTo: User;
  
    @OneToMany(() => Comment, (comment) => comment.task)
    comments: Comment[];
  }
  