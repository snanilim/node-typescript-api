import { MainRouter } from "../../core/router";

export class UserRouter extends MainRouter{
    constructor(){
        super();
    }

    async get(req, res) {
        console.log('call get', req.query);
    }

    onInit(): void{
        console.log('call onit');
        this.router.get('/', (req, res) => this.get(req, res));
    }
}