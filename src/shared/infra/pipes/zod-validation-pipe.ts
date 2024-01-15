// import { PipeTransform } from '@nestjs/common';
// import { ZodError, ZodSchema } from 'zod';
// import { fromZodError } from 'zod-validation-error';

// export class ZodValidationPipe implements PipeTransform {
//   constructor(private schema: ZodSchema) {}

//   transform(value: unknown) {
//     const errors = [];
//     try {
//       return this.schema.parse(value);
//     } catch (error) {
//       if (error instanceof ZodError) {
//         errors.push(fromZodError(error));
//       }

//       errors.push(error);
//     }

//     return errors;
//   }
// }
