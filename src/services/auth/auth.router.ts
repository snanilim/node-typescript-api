import {MainRouter} from '../../core/app/main.router';
import {get, register, login} from './auth.controller';

export class AuthRouter extends MainRouter {
  constructor() {
    super('auth');
  }

  onInit(): void {
    this.router.route('/').get(get);
    this.router.route('/register').post(register);
    this.router.route('/login').post(login);
  }
}
