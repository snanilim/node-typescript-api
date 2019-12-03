import * as config from 'config';
import {App} from '../core';
import {AppConfig} from '../core/app/app-config';
import {routes} from '../services/routes';

export const expressLoader = async () => {
  const app = new App(new AppConfig());
  app.bodyParser();
  app.helmet({noCache: true});
  app.cors();
  app.morgan();
  app.compression();
  app.apiPrefix(`${config.get('version')}/api`);
  app.modulesInitializer(routes);
  await app.listen(config.get('port'));
};
