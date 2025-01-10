import { Comment } from '../../comment/entities/comment.entity';
import { Project } from '../../project/entities/project.entity';
import { User } from '../../user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

export enum Status {
  PorHacer = 'por hacer',
  EnProgreso = 'en progreso',
  Completada = 'completada',
}

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.PorHacer,
  })
  status: Status;

  @Column({ type: 'date' })
  date_limit: Date;

  @DeleteDateColumn({ nullable: true })
  deleted_at: Date | null;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Project, (project) => project.tasks)
  @JoinColumn({ name: 'project_id' })
  project: number;

  @ManyToMany(() => User, (user) => user.tasks)
  @JoinTable({
    name: 'task_users',
    joinColumn: {
      name: 'task_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'user_id', 
      referencedColumnName: 'id',
    },
  })
  users: User[];

  @OneToMany(() => Comment, (comment) => comment.task)
  comments: Comment[];
}
