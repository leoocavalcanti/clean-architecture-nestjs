import { EntityValidationError } from '../../../../../shared/domain/errors/validation-error';
import { userSchema } from '../../../validators/user.validator';
import { UserDataBuilder } from '../../testing/helpers/user-data-builder';
import { UserEntity, UserProps } from '../../user.entity';

describe('UserEntity integration tests', () => {
  describe('Constructor method', () => {
    it('Should throw an error when creating user with invalid name', () => {
      let props: UserProps = {
        ...UserDataBuilder({}),
        name: null,
      };

      expect(() => new UserEntity(props, userSchema)).toThrow(
        EntityValidationError,
      );

      props = {
        ...UserDataBuilder({}),
        name: '',
      };

      expect(() => new UserEntity(props, userSchema)).toThrow(
        EntityValidationError,
      );

      props = {
        ...UserDataBuilder({}),
        name: 10,
      } as any;

      expect(() => new UserEntity(props, userSchema)).toThrow(
        EntityValidationError,
      );

      props = {
        ...UserDataBuilder({}),
        name: 'a'.repeat(256),
      };

      expect(() => new UserEntity(props, userSchema)).toThrow(
        EntityValidationError,
      );
    });

    it('Should throw an error when creating user with invalid email', () => {
      let props: UserProps = {
        ...UserDataBuilder({}),
        email: null,
      };

      expect(() => new UserEntity(props, userSchema)).toThrow(
        EntityValidationError,
      );

      props = {
        ...UserDataBuilder({}),
        email: '',
      };

      expect(() => new UserEntity(props, userSchema)).toThrow(
        EntityValidationError,
      );

      props = {
        ...UserDataBuilder({}),
        email: 10,
      } as any;

      expect(() => new UserEntity(props, userSchema)).toThrow(
        EntityValidationError,
      );

      props = {
        ...UserDataBuilder({}),
        email: 'a@mail.com'.repeat(101),
      };

      expect(() => new UserEntity(props, userSchema)).toThrow(
        EntityValidationError,
      );
    });

    it('Should throw an error when creating user with invalid password', () => {
      let props: UserProps = {
        ...UserDataBuilder({}),
        password: null,
      };

      expect(() => new UserEntity(props, userSchema)).toThrow(
        EntityValidationError,
      );

      props = {
        ...UserDataBuilder({}),
        password: '',
      };

      expect(() => new UserEntity(props, userSchema)).toThrow(
        EntityValidationError,
      );

      props = {
        ...UserDataBuilder({}),
        password: 10,
      } as any;

      expect(() => new UserEntity(props, userSchema)).toThrow(
        EntityValidationError,
      );

      props = {
        ...UserDataBuilder({}),
        password: 'a'.repeat(51),
      };

      expect(() => new UserEntity(props, userSchema)).toThrow(
        EntityValidationError,
      );
    });

    it('Should throw an error when creating user with invalid createdAt and updatedAt', () => {
      let props: UserProps = {
        ...UserDataBuilder({}),
        createdAt: '2023',
      } as any;

      expect(() => new UserEntity(props, userSchema)).toThrow(
        EntityValidationError,
      );

      props = {
        ...UserDataBuilder({}),
        createdAt: 10,
      } as any;

      expect(() => new UserEntity(props, userSchema)).toThrow(
        EntityValidationError,
      );

      props = {
        ...UserDataBuilder({}),
        updatedAt: '2023',
      } as any;

      expect(() => new UserEntity(props, userSchema)).toThrow(
        EntityValidationError,
      );

      props = {
        ...UserDataBuilder({}),
        updatedAt: 10,
      } as any;

      expect(() => new UserEntity(props, userSchema)).toThrow(
        EntityValidationError,
      );
    });

    it('Should a valid user', () => {
      expect.assertions(0);
      const props: UserProps = {
        ...UserDataBuilder({}),
      };
      new UserEntity(props, userSchema);
    });
  });
});
