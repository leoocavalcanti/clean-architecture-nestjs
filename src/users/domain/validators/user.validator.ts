import { UserProps } from '../entities/user.entity';
import { ZodValidatorFields } from '../../../shared/domain/validators/zod-validator-field';
import { ZodSchema, z } from 'zod';

export const userSchema = z.object({
  name: z.string().trim().min(3).max(255),
  email: z.string().trim().email().max(100),
  password: z.string().trim().min(6).max(50),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type UserSchema = z.infer<typeof userSchema>;

export class UserRules implements UserSchema {
  name: string;

  email: string;

  password: string;

  createdAt: Date;

  updatedAt: Date;

  constructor({ email, name, password, createdAt, updatedAt }: UserProps) {
    Object.assign(this, { email, name, password, createdAt, updatedAt });
  }
}

export class UserValidator extends ZodValidatorFields<UserRules> {
  validate(data: UserProps, schema: ZodSchema): boolean {
    return super.validate(new UserRules(data ?? ({} as UserProps)), schema);
  }
}

export class UserValidatorFactory {
  static create(): UserValidator {
    return new UserValidator();
  }
}
