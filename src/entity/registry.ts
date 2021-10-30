import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class Registry {
  @PrimaryGeneratedColumn()
  id: number; // id
  @Column()
  userName: string; // 用户名
  @Column()
  password: string; // 密码
  @Column({ default: '' })
  birthday: string; // 生日
  @Column({ default: '' })
  email: string; // 邮箱
  @Column({ default: false })
  isOnline: boolean; // 是否在线
  @UpdateDateColumn()
  updateTime: string;
  @CreateDateColumn()
  crateTime: string;
  @DeleteDateColumn()
  deleteTime: string;
}
