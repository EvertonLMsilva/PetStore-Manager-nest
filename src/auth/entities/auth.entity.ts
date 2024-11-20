
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Application } from './application.entity';

@Entity('auths')
export class Auth {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  email: string;

  @ManyToOne(() => Application, (application) => application.id)
  idApplication: Application;

  @Column({ default: true })
  isActive: boolean;
}

