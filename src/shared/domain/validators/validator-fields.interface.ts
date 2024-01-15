export type FieldsError = {
  validation?: string;
  code: string;
  message: string;
  path: string[];
  minimum?: number;
  type?: string;
  inclusive?: boolean;
  exact?: boolean;
};

export interface ValidatorFieldsInterface<PropsValidated> {
  validatedData: PropsValidated;
  validate(data: any, schema: any): boolean;
}
