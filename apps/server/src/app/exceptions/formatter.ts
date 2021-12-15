import { Error } from '@gui-nx/types';
import { HttpException, ValidationError } from '@nestjs/common';

export const validationPipeExceptionFormatter = (
  validationErrors: ValidationError[]
) => {
  const errors = validationErrors.reduce((acc, validationError) => {
    const fieldCode = `INVALID_FIELD_${validationError.property.toUpperCase()}`;
    const fieldErrors: Error[] = Object.values(validationError.constraints).map(
      (constraint) => {
        return {
          code: fieldCode,
          message: constraint,
        };
      }
    );

    return acc.concat(fieldErrors);
  }, []);

  return new HttpException(
    {
      errors: errors,
    },
    400
  );
};
