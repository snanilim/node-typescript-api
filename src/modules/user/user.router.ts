import { MainRouter } from '../../core/app/main.router';
import { User, Users } from './user.entity';

export class UserRouter extends MainRouter{
    constructor(){
        super('user');
    }

    async get(req, res, next) {
        throw new Error();
        const users = await Users.find();
        res.json({ users });
    }

    async post(req, res, next) {
        User.name = 'Shah Noor Alam Nilim';
        User.isPublic = true;

        await User.save();
        return res.json('user save successfully');
    }

    onInit(): void{
        this.router.get('/', (req, res, next) => this.get(req, res, next));
        this.router.post('/', (req, res, next) => this.post(req, res, next));
    }
}