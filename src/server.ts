import 'reflect-metadata';
import { App, dbInitializer } from './core'
import { dbConfig } from './config';
import { AppConfig } from './core/app/app-config';
import routes from './modules/routes';

async function bootstrap() {
    await dbInitializer({
        ...dbConfig,
        entities: [__dirname + '/**/*.entity{.ts,.js}']
    });

    const app = new App(new AppConfig);
    app.helmet();
    app.morgan();
    app.cors();
    app.modulesInitializer(routes);
    await app.listen();
}
bootstrap();
