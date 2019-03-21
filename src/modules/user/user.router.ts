import { Controller } from '../../core/app/main.router';
import { User, Users } from './user.entity';

export class UserRouter extends Controller{
    constructor(){
        super('user');
    }

    async get(req, res, next) {
        try {
            throw new Error();
        } catch (error) {
            throw new Error();
        }
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