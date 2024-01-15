import { UserEntity, UserProps } from '../../user.entity';
import { UserDataBuilder } from '../../testing/helpers/user-data-builder';
import { userSchema } from '../../../validators/user.validator';

describe('UserEntity unit tests', () => {
  let props: UserProps;
  let sut: UserEntity;

  beforeEach(() => {
    props = UserDataBuilder({});

    sut = new UserEntity(props, userSchema);
  });

  it('Constructor method', () => {
    expect(sut.props.name).toEqual(props.name);
    expect(sut.props.email).toEqual(props.email);
    expect(sut.props.password).toEqual(props.password);
    expect(sut.props.createdAt).toBeInstanceOf(Date);
  });

  it('Getter of name field', () => {
    expect(sut.props.name).toBeDefined();
    expect(sut.props.name).toEqual(props.name);
    expect(typeof sut.props.name).toBe('string');
  });

  it('Setter of name field', () => {
    sut['name'] = 'altered name';
    expect(sut.props.name).toEqual('altered name');
    expect(typeof sut.props.name).toBe('string');
  });

  it('Getter of email field', () => {
    expect(sut.props.email).toBeDefined();
    expect(sut.props.email).toEqual(props.email);
    expect(typeof sut.props.email).toBe('string');
  });

  it('Getter of password field', () => {
    expect(sut.props.password).toBeDefined();
    expect(sut.props.password).toEqual(props.password);
    expect(typeof sut.props.password).toBe('string');
  });

  it('Setter of password field', () => {
    sut['password'] = 'altered password';
    expect(sut.props.password).toEqual('altered password');
    expect(typeof sut.props.password).toBe('string');
  });

  it('Getter of date field', () => {
    expect(sut.props.createdAt).toBeDefined();
    expect(sut.props.createdAt).toBeInstanceOf(Date);
    expect(sut.props.updatedAt).toBeDefined();
    expect(sut.props.updatedAt).toBeInstanceOf(Date);
  });

  it('Should update a user', () => {
    sut.updateName('new name', userSchema);
    expect(sut.props.name).toEqual('new name');
  });

  it('Should update a user password', () => {
    sut.updatePassword('new password', userSchema);
    expect(sut.props.password).toEqual('new password');
  });
});
