import { Options } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import path from 'path';

export default {
  migrations: {
    path: path.join(__dirname, 'migrations'),
    tableName: 'migrations',
    transactional: true,
    pattern: /^[\w-]+\d+\.(ts|js)$/,
    disableForeignKeys: false,
    emit: 'js',
  },
  type: 'postgresql',
  tsNode: true,
  entities: [path.join(process.cwd(), '**', '*.entity.ts')],
  entitiesTs: [path.join(process.cwd(), '**', '*.entity.ts')],
  user: 'root',
  password: 'root',
  dbName: 'CUREWIKI',
  host: 'localhost',
  port: 5432,
  ssl: false,
} as Options<PostgreSqlDriver>;