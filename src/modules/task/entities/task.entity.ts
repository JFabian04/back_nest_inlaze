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

  @UpdateDateColumn()
  dateLimit: Date;

  @DeleteDateColumn({ nullable: true })
  deleted_at: Date | null;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Project, (project) => project.tasks)
  @JoinColumn({ name: 'project_id' })
  project: number;

  @ManyToOne(() => User, (user) => user.tasks)
  @JoinColumn({ name: 'task_id' })
  user: number;

  @OneToMany(() => Comment, (comment) => comment.task)
  comments: Comment[];
}
