import { Role } from '../../../entitites/role.entity';
import { Comment } from '../../comment/entities/comment.entity';
import { Project } from '../../project/entities/project.entity';
import { Task } from '../../task/entities/task.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
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

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Project, (project) => project.user)
  projects: Project[];

  @OneToMany(() => Task, (task) => task.assignedTo)
  tasks: Task[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: 'role_id' })
  role: Role;
}
