
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Application } from './application.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  email: string;

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => Application, (application) => application.user)
  application: Application;
}

