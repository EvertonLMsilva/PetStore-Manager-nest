
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Application {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;

  @Column('text')
  clientId: string;

  @Column('text')
  clientSecret: string;

  @OneToMany(() => User, (auth) => auth.application)
  user: User[];
}

