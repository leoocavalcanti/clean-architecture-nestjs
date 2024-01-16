import {
  UserRules,
  UserValidator,
  UserValidatorFactory,
} from '../../user.validator';
import { UserDataBuilder } from '../../../entities/testing/helpers/user-data-builder';
import { UserProps } from '../../../entities/user.entity';

let sut: UserValidator;
let props: UserProps;

describe('UserValidator unit tests', () => {
  beforeEach(() => {
    sut = UserValidatorFactory.create();
    props = UserDataBuilder({});
  });

  it('Valid case for user validator class', () => {
    const props = UserDataBuilder({});
    const isValid = sut.validate(props);
    expect(isValid).toBeTruthy();
    expect(sut.validatedData).toStrictEqual(new UserRules(props));
  });

  describe('Name field', () => {
    it('Invalidation cases for name field', () => {
      let isValid = sut.validate(null as any);
      expect(isValid).toBeFalsy();
      expect(sut.errors).toStrictEqual([
        { validation: 'name', message: 'Required' },
        { validation: 'email', message: 'Required' },
        { validation: 'password', message: 'Required' },
      ]);

      isValid = sut.validate({ ...props, name: '' });
      expect(isValid).toBeFalsy();
      expect(sut.errors).toStrictEqual([
        {
          validation: 'name',
          message: 'String must contain at least 3 character(s)',
        },
      ]);

      isValid = sut.validate({ ...props, name: 0 } as any);
      expect(isValid).toBeFalsy();
      expect(sut.errors).toStrictEqual([
        { validation: 'name', message: 'Expected string, received number' },
      ]);

      isValid = sut.validate({ ...props, name: 'a'.repeat(256) } as any);
      expect(isValid).toBeFalsy();
      expect(sut.errors).toStrictEqual([
        {
          validation: 'name',
          message: 'String must contain at most 255 character(s)',
        },
      ]);
    });
  });
  describe('Email field', () => {
    it('Invalidation cases for email field', () => {
      let isValid = sut.validate(null as any);
      expect(isValid).toBeFalsy();
      expect(sut.errors).toStrictEqual([
        { validation: 'name', message: 'Required' },
        { validation: 'email', message: 'Required' },
        { validation: 'password', message: 'Required' },
      ]);

      isValid = sut.validate({ ...props, email: '' });
      expect(isValid).toBeFalsy();
      expect(sut.errors).toStrictEqual([
        { validation: 'email', message: 'Invalid email' },
      ]);

      isValid = sut.validate({ ...props, email: 0 } as any);
      expect(isValid).toBeFalsy();
      expect(sut.errors).toStrictEqual([
        { validation: 'email', message: 'Expected string, received number' },
      ]);
    });
  });
  describe('Password field', () => {
    it('Invalidation cases for password field', () => {
      let isValid = sut.validate(null as any);
      expect(isValid).toBeFalsy();
      expect(sut.errors).toStrictEqual([
        { validation: 'name', message: 'Required' },
        { validation: 'email', message: 'Required' },
        { validation: 'password', message: 'Required' },
      ]);

      isValid = sut.validate({ ...props, password: '' });
      expect(isValid).toBeFalsy();
      expect(sut.errors).toStrictEqual([
        {
          validation: 'password',
          message: 'String must contain at least 6 character(s)',
        },
      ]);

      isValid = sut.validate({ ...props, password: 'a'.repeat(51) });
      expect(isValid).toBeFalsy();
      expect(sut.errors).toStrictEqual([
        {
          validation: 'password',
          message: 'String must contain at most 50 character(s)',
        },
      ]);
    });
  });

  describe('CreatedAt field', () => {
    it('Invalidation cases for createdAt field', () => {
      let isValid = sut.validate({ ...props, createdAt: 10 } as any);

      expect(isValid).toBeFalsy();
      expect(sut.errors).toStrictEqual([
        { validation: 'createdAt', message: 'Expected date, received number' },
      ]);

      isValid = sut.validate({ ...props, createdAt: '10' } as any);

      expect(isValid).toBeFalsy();
      expect(sut.errors).toStrictEqual([
        { validation: 'createdAt', message: 'Expected date, received string' },
      ]);
    });
  });

  describe('UpdatedAt field', () => {
    it('Invalidation cases for updatedAt field', () => {
      let isValid = sut.validate({ ...props, updatedAt: 10 } as any);

      expect(isValid).toBeFalsy();
      expect(sut.errors).toStrictEqual([
        { validation: 'updatedAt', message: 'Expected date, received number' },
      ]);

      isValid = sut.validate({ ...props, updatedAt: '10' } as any);

      expect(isValid).toBeFalsy();
      expect(sut.errors).toStrictEqual([
        { validation: 'updatedAt', message: 'Expected date, received string' },
      ]);
    });
  });
});
