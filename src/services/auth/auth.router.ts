import { MainRouter } from '../../core/app/main.router';
import { register, login } from './auth.controller';

export class AuthRouter extends MainRouter{
    constructor(){
        super('auth');
    }

    onInit(): void {
        this.router.route('/register').post(register);
        this.router.route('/login').post(login);
    }
}