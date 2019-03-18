import 'reflect-metadata';
import { App, connect } from './core';
import { AppConfig } from './core/app/app-config';
import routes from './modules/routes';
connect;
async function bootstrap() {
    
    console.log('call next');
    const app = new App(new AppConfig);
    app.helmet();
    app.morgan();
    app.cors();
    app.modulesInitializer(routes);
    await app.listen();
}
bootstrap();
