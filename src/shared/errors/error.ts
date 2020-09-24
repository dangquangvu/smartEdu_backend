import {
  HttpStatus,
} from '@nestjs/common';

export const Errors = {
  ACCESS_TOKEN_HEADER_NOT_PROVIDED: {
    message: 'An access-token header is required',
    statusCode: HttpStatus.UNAUTHORIZED,
  },
  JWT_EXPIRED: {
    message: 'Jwt token expired',
    statusCode: HttpStatus.UNAUTHORIZED,
  },
  NOT_VALID_JWT: {
    message: 'Not valid Jwt',
    statusCode: HttpStatus.UNAUTHORIZED,
  },
  NOT_VALID_OTP: {
    message: 'Not valid OTP',
    statusCode: HttpStatus.BAD_REQUEST,
  },
  EMAIL_FORMAT_IS_NOT_VALID: {
    message: 'Email format is not valid',
    statusCode: HttpStatus.BAD_REQUEST,
  },
  EMAIL_IS_ALREADY_TAKEN: {
    message: 'Email is already taken',
    statusCode: HttpStatus.BAD_REQUEST,
  },
  PHONE_IS_ALREADY_TAKEN: {
    message: 'Phone is already taken',
    statusCode: HttpStatus.BAD_REQUEST,
  },
  EMAIL_OR_PHONE_REQUIRED: {
    message: 'Email or phone must be provided',
    statusCode: HttpStatus.BAD_REQUEST,
  },
};

export const MappedErrorMessages = {
  approved: 'Transaction was a success.',
  cancel_login: 'Customer cancel at the login page',
  cancel_transaction: 'Customer cancel transaction.',
};
