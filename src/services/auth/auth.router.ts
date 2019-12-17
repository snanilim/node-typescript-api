import {MainRouter} from '../../core/app/main.router';
import {get, register, login} from './auth.controller';
import {schemaValidator} from '../../helper';
import {authSchemas} from './auth.schemas';

export class AuthRouter extends MainRouter {
  constructor() {
    super('auth');
  }

  onInit(): void {
    this.router.route('/').get(get);
    this.router.route('/register').post(schemaValidator(authSchemas.register, 'body'), register);
    this.router.route('/login').post(login);
  }
}
