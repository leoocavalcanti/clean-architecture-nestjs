import { ZodSchema } from 'zod';
import { Entity } from '../../../shared/domain/entities/entity';
import { UserValidatorFactory, userSchema } from '../validators/user.validator';
import { EntityValidationError } from '../../../shared/domain/errors/validation-error';

export type UserProps = {
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export class UserEntity extends Entity<UserProps> {
  constructor(
    public readonly props: UserProps,
    id?: string,
  ) {
    UserEntity.validate(props, userSchema);
    super(props, id, userSchema);
    this.props.createdAt = this.props.createdAt ?? new Date();
    this.props.updatedAt = this.props.updatedAt ?? new Date();
  }

  updateName(value: string, schema: ZodSchema = userSchema) {
    UserEntity.validate({ ...this.props, name: value }, schema);
    this.name = value;
  }

  updatePassword(value: string, schema: ZodSchema = userSchema) {
    UserEntity.validate({ ...this.props, password: value }, schema);
    this.password = value;
  }

  get name() {
    return this.props.name;
  }

  private set name(value: string) {
    this.props.name = value;
  }

  get email() {
    return this.props.email;
  }

  get password() {
    return this.props.password;
  }

  private set password(value: string) {
    this.props.password = value;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  static validate(props: UserProps, schema: ZodSchema = userSchema) {
    const validator = UserValidatorFactory.create();
    const isValid = validator.validate(props, schema);

    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }
}
