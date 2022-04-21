// import 'reflect-metadata';
// import { DataSource } from 'typeorm';

// const AppDataSource = new DataSource({
//   type: 'mysql',
//   host: '82.157.59.68',
//   port: 3306,
//   username: 'root',
//   password: 'eMkd4Aw5sKeXhDy4',
//   database: 'sign',
//   entities: [__dirname + '../entity/**/*.entity{.ts,.js}'],
//   synchronize: true,
//   logging: false,
// });

// AppDataSource.initialize()
//   .then(() => {
//     console.log('数据库连接成功');
//   })
//   .catch((err) => {
//     console.log('数据库连接失败', err);
//   });

export default () => ({
  type: 'mysql',
  host: '82.157.59.68',
  port: 3306,
  username: 'root',
  password: 'eMkd4Aw5sKeXhDy4',
  database: 'sign',
  entities: [__dirname + '../entity/**/*.entity{.ts,.js}'],
  synchronize: true,
  logging: false,
});
