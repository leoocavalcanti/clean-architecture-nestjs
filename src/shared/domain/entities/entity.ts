import { v4 as uuidv4 } from 'uuid';

export abstract class Entity<Props = any> {
  public readonly _id: string;
  public readonly props: Props;
  public readonly schema: any;

  constructor(props: Props, id?: string, schema?: any) {
    this.props = props;
    this._id = id || uuidv4();
    this.schema = schema;
  }

  get id() {
    return this.id;
  }

  toJSON(): Required<{ id: string } & Props> {
    return {
      id: this._id,
      ...this.props,
    } as Required<{ id: string } & Props>;
  }
}
