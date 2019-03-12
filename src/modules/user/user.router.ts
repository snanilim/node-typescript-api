import { MainRouter } from '../../core/app/main.router';
import { User, Users } from './user.entity';

export class UserRouter extends MainRouter{
    constructor(){
        super('user');
    }

    async get(req, res) {
        const users = await Users.find();
        res.json({ users });
    }

    async post(req, res) {
        User.name = 'Shah Noor Alam Nilim';
        User.isPublic = true;

        await User.save();
        return res.json('user save successfully');
    }

    onInit(): void{
        this.router.get('/', (req, res) => this.get(req, res));
        this.router.post('/', (req, res) => this.post(req, res));
    }
}