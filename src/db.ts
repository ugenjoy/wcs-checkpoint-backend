import { DataSource } from 'typeorm'

export const dataSource = new DataSource({
  type: 'sqlite',
  database: './database/db.sqlite',
  entities: ['./src/models/*.ts'],
  synchronize: true,
  logging: true,
})
