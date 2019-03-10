import {App} from './core/app'
import { AppConfig } from './core/app-config';
import modules from './modules/configure.modules';


async function bootstrap() {
    const app = new App(new AppConfig);
    app.helmet();
    app.morgan();
    app.cors();
    app.initModules(modules);
    await app.listen();
}
bootstrap();
