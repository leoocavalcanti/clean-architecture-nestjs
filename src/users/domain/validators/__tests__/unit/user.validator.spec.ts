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

  describe('Teste', () => {
    it('Teste', () => {
      const props = UserDataBuilder({});

      console.log(userSchema.parse({ ...props, name: 0, email: 0 }));
    });
  });

  describe('Name field', () => {
    it('Invalidation cases for name field', () => {
      let isValid = sut.validate(null as any);
      expect(isValid).toBeFalsy();
      expect(sut.errors['name']).toStrictEqual([
        'name should not be empty',
        'name must be a string',
        'name must be shorter than or equal to 255 characters',
      ]);

      const props = UserDataBuilder({});

      isValid = sut.validate({ ...props, name: '' });
      expect(isValid).toBeFalsy();
      expect(sut.errors['name']).toStrictEqual(['name should not be empty']);

      isValid = sut.validate({ ...props, name: 0 } as any);
      expect(isValid).toBeFalsy();
      expect(sut.errors['name']).toStrictEqual([
        'name must be a string',
        'name must be shorter than or equal to 255 characters',
      ]);

      isValid = sut.validate({ ...props, name: 'a'.repeat(256) } as any);
      expect(isValid).toBeFalsy();
      expect(sut.errors['name']).toStrictEqual([
        'name must be shorter than or equal to 255 characters',
      ]);
    });

    it('Valid case for name field', () => {
      const props = UserDataBuilder({});

      const isValid = sut.validate(props);

      expect(isValid).toBeTruthy();

      expect(sut.validatedData).toStrictEqual(new UserRules(props));
    });
  });

  describe('Email field', () => {
    it('Invalidation cases for email field', () => {
      let isValid = sut.validate(null as any);
      expect(isValid).toBeFalsy();
      expect(sut.errors['email']).toStrictEqual([
        'email must be an email',
        'email should not be empty',
        'email must be a string',
        'email must be shorter than or equal to 255 characters',
      ]);

      const props = UserDataBuilder({});

      isValid = sut.validate({ ...props, email: '' });
      expect(isValid).toBeFalsy();
      expect(sut.errors['email']).toStrictEqual([
        'email must be an email',
        'email should not be empty',
      ]);

      isValid = sut.validate({ ...props, email: 0 } as any);
      expect(isValid).toBeFalsy();
      expect(sut.errors['email']).toStrictEqual([
        'email must be an email',
        'email must be a string',
        'email must be shorter than or equal to 255 characters',
      ]);
    });

    it('Valid case for email field', () => {
      const props = UserDataBuilder({});

      const isValid = sut.validate(props);

      expect(isValid).toBeTruthy();

      expect(sut.validatedData).toStrictEqual(new UserRules(props));
    });
  });
});
