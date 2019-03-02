import {App} from './core/app'
import { UserRouter } from './user/userRouter';
import { AppConfig } from './core/app-config';


async function bootstrap() {
    const app = new App(new AppConfig);
    app.helmet();
    app.morgan();
    app.cors();
    app.initRouters([new UserRouter()]);
    await app.listen();
}
bootstrap();
