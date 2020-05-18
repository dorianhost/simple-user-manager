import Joi from '@hapi/joi';

export function validate(
  paramsToValidate: object,
  schema: Joi.ObjectSchema,
): { errors?: any; errorMessage?: string } {
  const validationResult: Joi.ValidationResult = schema.validate(paramsToValidate, {
    abortEarly: false,
  });

  const result: Record<string, string | string[]> = {};

  if (validationResult.error) {
    result.errors = validationResult.error.details.map(detail => detail.message);

    result.errorMessage = validationResult.error.message;
  }

  return result;
}
