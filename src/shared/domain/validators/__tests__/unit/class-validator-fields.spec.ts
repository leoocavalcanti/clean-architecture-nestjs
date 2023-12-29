import { ClassValidatorFields } from '../../class-validator-field';
import * as libClassValidator from 'class-validator';

class StubClassValidatorFields extends ClassValidatorFields<{
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
    const spyValidateSync = jest
      .spyOn(libClassValidator, 'validateSync')
      .mockReturnValueOnce([
        {
          property: 'field',
          constraints: {
            isNotEmpty: 'field is required',
          },
        },
      ]);

    expect(sut.validate(null)).toBeFalsy();
    expect(spyValidateSync).toHaveBeenCalled();
    expect(sut.validatedData).toBeNull();
    expect(sut.errors).toStrictEqual({ field: ['field is required'] });
  });

  it('Should validate without errors', () => {
    const spyValidateSync = jest
      .spyOn(libClassValidator, 'validateSync')
      .mockReturnValueOnce([]);

    expect(sut.validate({ field: 'value' })).toBeTruthy();
    expect(spyValidateSync).toHaveBeenCalled();
    expect(sut.validatedData).toStrictEqual({ field: 'value' });
    expect(sut.errors).toBe(null);
  });
});
