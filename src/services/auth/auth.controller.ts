import * as service from './auth.service';

export const register = async (req, res, next) => {
    try {
        // const aaaa;
        const response = await service.register(req.body);
        res.send(response);
    } catch (error) {
        return next(error);
    }

};