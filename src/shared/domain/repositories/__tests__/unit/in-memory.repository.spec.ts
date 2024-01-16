import { randomUUID } from 'node:crypto';
import { Entity } from '../../../entities/entity';
import { InMemoryRepository } from '../../in-memory.repository';
import { NotFoundError } from '../../../errors/not-found.error';

type StubEntityProps = {
  name: string;
  price: number;
};

class StubEntity extends Entity<StubEntityProps> {}

class StubInMemoryRepository extends InMemoryRepository<StubEntity> {}

describe('InMemoryRepository unit tests', () => {
  let sut: StubInMemoryRepository;
  let id: string;

  beforeEach(() => {
    sut = new StubInMemoryRepository();
    id = randomUUID();
  });

  it('Should save a new entity', async () => {
    const entity = new StubEntity({ name: 'name', price: 10 });
    await sut.save(entity);
    expect(entity.toJSON()).toStrictEqual(sut.items[0].toJSON());
  });

  it('Should throw error when entity not found', async () => {
    await expect(sut.findById(id)).rejects.toThrow(
      new NotFoundError('Entity not found'),
    );
  });

  it('Should find a entity by id', async () => {
    const entity = new StubEntity({ name: 'name', price: 10 });
    await sut.save(entity);
    const result = await sut.findById(entity._id);
    expect(entity.toJSON()).toStrictEqual(result.toJSON());
  });

  it('Should returns all entities', async () => {
    const entity = new StubEntity({ name: 'name', price: 10 });
    await sut.save(entity);
    const result = await sut.findAll();
    expect(result).toHaveLength(1);
  });

  it('Should throw an error on update when entity not found', async () => {
    const entity = new StubEntity({ name: 'name', price: 10 });
    await expect(sut.updateById(entity.id, entity)).rejects.toThrow(
      new NotFoundError('Entity not found'),
    );
  });

  it('Should update an entity', async () => {
    const entity = new StubEntity({ name: 'name', price: 10 });
    await sut.save(entity);

    const entityUpdated = new StubEntity(
      { name: 'new name', price: 20 },
      entity._id,
    );

    await sut.updateById(entity._id, entityUpdated);

    expect(entityUpdated.toJSON()).toStrictEqual(sut.items[0].toJSON());
  });
});
