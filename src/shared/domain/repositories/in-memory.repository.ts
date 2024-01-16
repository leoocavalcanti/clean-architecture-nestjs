import { Entity } from '../entities/entity';
import { NotFoundError } from '../errors/not-found.error';
import { RepositoryInterface } from './repository-contract';

export abstract class InMemoryRepository<E extends Entity>
  implements RepositoryInterface<E>
{
  items: E[] = [];

  async save(entity: E): Promise<E> {
    this.items.push(entity);
    return entity;
  }

  async findAll(): Promise<E[]> {
    return this.items;
  }

  async findById(id: string): Promise<E> {
    return await this._get(id);
  }

  async updateById(id: string, entity: E): Promise<E> {
    await this._get(id);
    const index = this.items.findIndex((item) => item.id === entity.id);
    this.items[index] = entity;
    return entity;
  }

  async deleteById(id: string): Promise<void> {
    await this._get(id);
    const index = this.items.findIndex((item) => item.id === id);
    this.items.slice(index, 1);
  }

  protected async _get(id: string): Promise<E> {
    const _id = `${id}`;
    const entity = this.items.find((item) => item.id === _id);

    if (!entity) {
      throw new NotFoundError('Entity not found');
    }

    return entity;
  }
}
