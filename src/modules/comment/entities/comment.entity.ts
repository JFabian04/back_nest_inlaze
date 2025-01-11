import { Task } from '../../task/entities/task.entity';
import { User } from '../../user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';


@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;
  
  @Column({ default: false })
  read: boolean;  

  @DeleteDateColumn({ nullable: true })
  deleted_at: Date | null;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Task, (task) => task.comments)
  @JoinColumn({ name: 'task_id' })
  task: Task;

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn({ name: 'user_id' })
  user: User;
  
}
