import { RequestHandler } from 'express'
import { z } from 'zod'
import { UseService } from './user.service'

const createUser: RequestHandler = async (req, res, next) => {
  try {
    const createUserZodSchema = z.object({
      body: z.object({
        role: z.string({
          required_error: 'role is required',
        }),
        password: z.string().optional(),
      }),
    })

    await createUserZodSchema.parseAsync(req)
    //req validation
    //body--> object
    //data in body --> object

    const { user } = req.body
    const result = await UseService.createUser(user)
    res.status(200).json({
      sucess: true,
      message: 'user created successfully ',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

export const UserController = {
  createUser,
}
