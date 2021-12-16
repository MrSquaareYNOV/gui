import { Errors } from '@gui-nx/types';
import { HttpException } from '@nestjs/common';

export const toHttpException = (errors: Errors, status = 400) => {
  return new HttpException(
    {
      errors: errors.list,
    },
    status
  );
};
