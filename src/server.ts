import 'reflect-metadata';
import { App, dbInitializer } from './core'
import { dbConfig } from './config';
import { AppConfig } from './core/app/app-config';
import modules from './modules/configure.modules';

async function bootstrap() {


    // const photo = new Photo();
    // photo.name = "Shah nilim";
    // photo.isPublic = true;

    // // const photoRepo = getRepository(Photo);

    // await photo.save();
    // console.log('save new photo');

    // const response = await Photo.findOne('5c860c138c065828c4bd65af');
    // console.log(response);

    await dbInitializer({
        ...dbConfig,
        entities: [__dirname + '/**/*.entity{.ts,.js}']
    });

    const app = new App(new AppConfig);
    app.helmet();
    app.morgan();
    app.cors();
    app.modulesInitializer(modules);
    await app.listen();
}
bootstrap();
