import * as moment from 'moment';
import * as config from 'config';
import User from '../user/user.model';
import RefreshToken from './refreshToken';

const generateToken = (user, accessToken) => {
    const tokenType = 'Bearer';
    const refreshToken = RefreshToken.generate(user).token; // its only reply token from full obj
    const expireTime = moment().add(config.get('jwtTimeExpire'), 'minutes').unix();

    return {
        tokenType,
        refreshToken,
        accessToken,
        expireTime,
    };
};

export const register = async (data) => {
    try {
        const user = new User({
            email: data.email,
            password: data.password
        });
        const resSaveUser = user.save();
        const token = generateToken(resSaveUser, resSaveUser.token);
        return token;
    } catch (error) {
        throw User.checkDuplicateEmail(error);
    }

};