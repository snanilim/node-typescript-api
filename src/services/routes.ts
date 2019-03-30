import { UserRouter } from './user/user.router';
import { AccountRouter } from './account/account.router';

const routes = [
    new UserRouter(),
    new AccountRouter(),
]
export default routes;
