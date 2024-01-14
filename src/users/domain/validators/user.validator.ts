import { UserProps } from '../entities/user.entity';
import { ClassValidatorFields } from '../../../shared/domain/validators/class-validator-field';
import { z } from 'zod';

export const userSchema = z.object({
  name: z.string().max(255),
  email: z.string().email().max(255),
  password: z.string().max(100),
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

export class UserValidator extends ClassValidatorFields<UserRules> {
  validate(data: UserProps): boolean {
    return super.validate(new UserRules(data ?? ({} as UserProps)));
  }
}

export class UserValidatorFactory {
  static create(): UserValidator {
    return new UserValidator();
  }
}
