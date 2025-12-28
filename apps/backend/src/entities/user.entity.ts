import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export default class Users {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true, nullable: false })
  email: string;
  @Column({ unique: true, nullable: false })
  phone: string;
  @Column({ nullable: false })
  role: string;
  @Column({ length: 25, nullable: true })
  first_name: string;
  @Column({ length: 25, nullable: true })
  last_name: string;
  @Column({ select: false, nullable: false })
  password: string;
}
