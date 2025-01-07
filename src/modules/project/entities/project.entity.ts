import { Task } from 'src/modules/task/entities/task.entity';
import { User } from 'src/modules/user/entities/user.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
  } from 'typeorm';

  
  @Entity('projects')
  export class Project {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  
    @Column()
    description: string;
  
    @ManyToOne(() => User, (user) => user.projects)
    user: User;
  
    @OneToMany(() => Task, (task) => task.project)
    tasks: Task[];
  }
  