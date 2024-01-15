import { ZodSchema } from 'zod';
import { ValidatorFieldsInterface } from './validator-fields.interface';

export type FieldsError = {
  validation?: string;
  code: string;
  message: string;
  path: string[];
  minimum?: number;
  type?: string;
  inclusive?: boolean;
  exact?: boolean;
};

export abstract class ZodValidatorFields<PropsValidated>
  implements ValidatorFieldsInterface<PropsValidated>
{
  public errors: FieldsError[] = null;
  public validatedData: PropsValidated = null;

  validate(data: any, schema: ZodSchema): boolean {
    let errors = null;
    try {
      errors = schema.parse(data);
      this.validatedData = data;

      return true;
    } catch (err) {
      errors = err.message;

      const formattedErrors = JSON.parse(errors).map(
        (error: { path: Array<string>; message: string }) => {
          return {
            validation: error.path.join('.'),
            message: error.message,
          };
        },
      );

      this.errors = formattedErrors;
      return !errors.length;
    }
  }
}
