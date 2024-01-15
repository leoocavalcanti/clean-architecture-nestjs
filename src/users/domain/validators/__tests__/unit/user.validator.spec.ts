import {
  UserRules,
  UserValidator,
  UserValidatorFactory,
  userSchema,
} from '../../user.validator';
import { UserDataBuilder } from '../../../entities/testing/helpers/user-data-builder';

let sut: UserValidator;

describe('UserValidator unit tests', () => {
  beforeEach(() => {
    sut = UserValidatorFactory.create();
  });

  describe('Name field', () => {
    it('Invalidation cases for name field', () => {
      let isValid = sut.validate(null as any, userSchema);
      expect(isValid).toBeFalsy();
      expect(sut.errors).toStrictEqual([
        { validation: 'name', message: 'Required' },
        { validation: 'email', message: 'Required' },
        { validation: 'password', message: 'Required' },
      ]);

      const props = UserDataBuilder({});
      isValid = sut.validate({ ...props, name: '' }, userSchema);
      expect(isValid).toBeFalsy();
      expect(sut.errors).toStrictEqual([
        {
          validation: 'name',
          message: 'String must contain at least 3 character(s)',
        },
      ]);

      isValid = sut.validate({ ...props, name: 0 } as any, userSchema);
      expect(isValid).toBeFalsy();
      expect(sut.errors).toStrictEqual([
        { validation: 'name', message: 'Expected string, received number' },
      ]);

      isValid = sut.validate(
        { ...props, name: 'a'.repeat(256) } as any,
        userSchema,
      );
      expect(isValid).toBeFalsy();
      expect(sut.errors).toStrictEqual([
        {
          validation: 'name',
          message: 'String must contain at most 255 character(s)',
        },
      ]);
    });

    it('Valid case for name field', () => {
      const props = UserDataBuilder({});
      const isValid = sut.validate(props, userSchema);
      expect(isValid).toBeTruthy();
      expect(sut.validatedData).toStrictEqual(new UserRules(props));
    });
  });
  describe('Email field', () => {
    it('Invalidation cases for email field', () => {
      let isValid = sut.validate(null as any, userSchema);
      expect(isValid).toBeFalsy();
      expect(sut.errors).toStrictEqual([
        { validation: 'name', message: 'Required' },
        { validation: 'email', message: 'Required' },
        { validation: 'password', message: 'Required' },
      ]);

      const props = UserDataBuilder({});
      isValid = sut.validate({ ...props, email: '' }, userSchema);
      expect(isValid).toBeFalsy();
      expect(sut.errors).toStrictEqual([
        { validation: 'email', message: 'Invalid email' },
      ]);

      isValid = sut.validate({ ...props, email: 0 } as any, userSchema);
      expect(isValid).toBeFalsy();
      expect(sut.errors).toStrictEqual([
        { validation: 'email', message: 'Expected string, received number' },
      ]);
    });

    it('Valid case for email field', () => {
      const props = UserDataBuilder({});
      const isValid = sut.validate(props, userSchema);
      expect(isValid).toBeTruthy();
      expect(sut.validatedData).toStrictEqual(new UserRules(props));
    });
  });
});
