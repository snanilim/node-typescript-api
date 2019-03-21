import * as dotenv from 'dotenv';
dotenv.config();
import * as config from 'config';
import 'reflect-metadata';
import { App, dbInitializer } from './core';
import { dbConfig } from './configer';
import { AppConfig } from './core/app/app-config';
import routes from './modules/routes';

async function bootstrap() {

    const app = new App(new AppConfig());
    app.useControllers(routes);

    await app.listen();
}
bootstrap();
