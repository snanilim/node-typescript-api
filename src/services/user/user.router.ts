import { MainRouter } from '../../core/app/main.router';
import { get, post } from './user.controller';

export class UserRouter extends MainRouter{
    constructor(){
        super('user');
    }

    onInit(): void{
        this.router.get('/', (req, res, next) => get(req, res, next));
        this.router.post('/', (req, res, next) => post(req, res, next));
    }
}