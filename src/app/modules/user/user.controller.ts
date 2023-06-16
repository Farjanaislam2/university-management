import { RequestHandler } from 'express';

import { UseService } from './user.service';

const createUser: RequestHandler = async (req, res, next) => {
  try {
    const { user } = req.body;
    const result = await UseService.createUser(user);
    res.status(200).json({
      sucess: true,
      message: 'user created successfully ',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const UserController = {
  createUser,
};
