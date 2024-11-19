
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('applications')
export class Application {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;

  @Column('text')
  clientId: string;

  @Column('text')
  clientSecret: string;
}

