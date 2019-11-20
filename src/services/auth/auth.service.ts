import * as moment from 'moment';
import * as config from 'config';
import User from '../user/user.model';
import RefreshToken from './refreshToken';

const generateToken = (user, accessToken) => {
  try {
    const tokenType = 'Bearer';
    const refreshToken = RefreshToken.generate(user).token; // its only reply token from full obj
    const expireTime = moment()
      .add(config.get('jwtTimeExpire'), 'minutes')
      .unix();

    return {
      tokenType,
      refreshToken,
      accessToken,
      expireTime
    };
  } catch (error) {
    throw error;
  }
};

export const register = async (data) => {
  try {
    const user = new User({
      email: data.email,
      password: data.password
    });
    const resSaveUser = await user.save();
    const token = generateToken(resSaveUser, resSaveUser.token);
    return token;
  } catch (error) {
    throw User.checkDuplicateEmail(error);
  }
};

export const login = async (userData) => {
  try {
    const {user, accessToken} = await User.findAndGenerateToken(userData);
    const token = generateToken(user, accessToken);
    return {token, user: user.userInfo()};
  } catch (error) {
    throw User.checkDuplicateEmail(error);
  }
};
