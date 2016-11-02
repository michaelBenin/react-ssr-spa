import dotenv from 'dotenv';
import path from 'path';

const envFilePath = path.resolve(__dirname, '../../../', '.env');

dotenv.config({
  silent: true,
  path: envFilePath
});
