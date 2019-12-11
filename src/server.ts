import * as dotenv from 'dotenv';
dotenv.config();
import 'reflect-metadata';
import {dbInitializer} from './core';
import {expressLoader} from './loaders/appLoders';

async function bootstrap() {
  await dbInitializer();
  expressLoader();
}
bootstrap();
// export default bootstrap;