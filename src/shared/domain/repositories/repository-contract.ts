import { Entity } from '../entities/entity';

export interface RepositoryInterface<E extends Entity> {
  save(entity: E): Promise<E>;
  findById(id: string): Promise<E>;
  updateById(id: string, entity: E): Promise<E>;
  deleteById(id: string): Promise<void>;
  findAll(): Promise<E[]>;
}
