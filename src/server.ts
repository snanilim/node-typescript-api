import {App} from './core/app'
import { AppConfig } from './core/app-config';
import services from './services/configureServices';


async function bootstrap() {
    const app = new App(new AppConfig);
    app.helmet();
    app.morgan();
    app.cors();
    app.initRouters(services.allServices());
    await app.listen();
}
bootstrap();
