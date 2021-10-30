import { join } from 'path';
export default {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'Qsj.0228',
  database: 'blog',
  synchronize: true,
  logging: false,
  entities: [join(__dirname, '../', 'entity/**{.ts,.js}')],
};
