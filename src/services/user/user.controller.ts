import { User, Users } from './user.entity';

export const get = async (req, res, next) => {
    try {
        throw new Error();
    } catch (error) {
        throw new Error();
    }
    throw new Error();
    const users = await Users.find();
    res.json({ users });
};

export const post = async (req, res, next) => {
    User.name = 'Shah Noor Alam Nilim';
    User.isPublic = true;

    await User.save();
    return res.json('user save successfully');
};