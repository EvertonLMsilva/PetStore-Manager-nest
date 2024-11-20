
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Auth } from './auth.entity';

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

  @OneToMany(() => Auth, (auth) => auth.id)
  idApplication: Auth[];

}

