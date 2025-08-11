/*eslint-disable prettier/prettier*/
import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432, 
    username: 'postgres',
    password: '3214',
    database: 'spotify_clone',
    entities: ['dist/**/*.entity.js'],
    synchronize: false,
    migrations: ['dist/db/migrations/*.js']
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;