
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('auths')
export class Auth {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  email: string;

  @Column({ unique: true })
  idApplication: string;
}

