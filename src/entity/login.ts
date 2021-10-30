import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Login {
  @PrimaryGeneratedColumn()
  id: number; // id
  @Column()
  userName: string; // 用户名
  @Column()
  password: string; // 密码
  @Column({ default: '' })
  email: string; // 邮箱
  @UpdateDateColumn()
  updateTime: string;
  @CreateDateColumn()
  crateTime: string;
  @DeleteDateColumn()
  deleteTime: string;
}
