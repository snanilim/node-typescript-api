import { MainRouter } from "../../core/app/router";
import { User, Users } from "./user.entity";

export class UserRouter extends MainRouter{
    constructor(){
        super();
    }

    async get(req, res) {
        const users = await Users.find();
        res.json({'users': users})
    }

    async post(req, res) {
        User.name = "Shah Noor Alam Nilim";
        User.isPublic = true;

        await User.save();
        return res.json('user save successfully');
    }

    onInit(): void{
        console.log('call onit');
        this.router.get('/', (req, res) => this.get(req, res));
        this.router.post('/', (req, res) => this.post(req, res));
    }
}