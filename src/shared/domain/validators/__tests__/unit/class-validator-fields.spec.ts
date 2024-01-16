import { ZodValidatorFields } from '../../zod-validator-field';
import { userSchema } from '../../../../../users/domain/validators/user.validator';
import { z } from 'zod';

class StubClassValidatorFields extends ZodValidatorFields<{
  field: string;
}> {}

let sut: StubClassValidatorFields;

beforeEach(() => {
  sut = new StubClassValidatorFields();
});

describe('ClassValidatorFields unit tests', () => {
  it('Should initialize errors and validatedData with null', () => {
    expect(sut.errors).toBeNull();
    expect(sut.validatedData).toBeNull();
  });

  it('Should validate with errors', () => {
    expect(sut.validate(null, userSchema)).toBeFalsy();
    expect(sut.validatedData).toBeNull();
    expect(sut.errors).toStrictEqual([
      { validation: '', message: 'Expected object, received null' },
    ]);
  });

  it('Should validate without errors', () => {
    const mockSchema = z.object({
      field: z.string(),
    });

    expect(sut.validate({ field: 'value' }, mockSchema)).toBeTruthy();
    expect(sut.validatedData).toStrictEqual({ field: 'value' });
    console.log(sut.validatedData);
    expect(sut.errors).toBe(null);
  });
});
