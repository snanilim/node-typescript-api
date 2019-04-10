import * as service from './auth.service';

export const register = async (req, res, next) => {
    console.log(req.body);
    const response = await service.register(req.body);
    res.send(response);
};