/* eslint-disable no-unused-expressions */

import { ErrorRequestHandler, NextFunction } from 'express'
import ApiError from '../../erros/ApiErrors'
import handleValidationError from '../../erros/handleValidationError'
import IGenericErrorMessage from '../../interfaces/error'
import config from '../config'
import { errorlogger } from '../../shared/logger'

const globalErrorHandler: ErrorRequestHandler = (
  error,
  req,
  res,
  next: NextFunction
) => {
  config.env === 'development'
    ? console.log('globalErrorHandler', error)
    : errorlogger.error('globalErrorHandler', error)

  let statusCode = 500
  let message = 'Somethig went wrong'
  let errorMessages: IGenericErrorMessage[] = []

  if (error?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessages
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode
    message = error?.message
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : []
  } else if (error instanceof Error) {
    message = error?.message
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : []
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? error?.stack : undefined,
  })
  next(error)
}

export default globalErrorHandler
