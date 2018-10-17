import knex from 'knex';
import knexFile from '../knexfile';

const environment = process.env.NODE_ENV || 'development';
const configuration = knexFile[environment];
export default knex(configuration);
