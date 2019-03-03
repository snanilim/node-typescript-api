import { UserRouter } from './user/userRouter';

export default class ConfigureServices{
    static allServices(): any[]{
        const addAllRouter = [
            new UserRouter()
        ]
        return addAllRouter;
    }   
}