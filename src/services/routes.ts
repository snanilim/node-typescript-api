import { UserRouter } from './user/user.router';
import { AccountRouter } from './account/account.router';
import { AuthRouter } from './auth/auth.router';

const routes = [
    new AuthRouter(),
    new UserRouter(),
    new AccountRouter(),
];
export default routes;
