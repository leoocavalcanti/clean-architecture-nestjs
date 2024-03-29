import { FieldsError } from '../validators/validator-fields.interface';

export class ValidationError extends Error {}

export class EntityValidationError extends Error {
  constructor(public errors: FieldsError[]) {
    super('Entity validation error');
    this.name = 'EntityValidationError';
  }
}
