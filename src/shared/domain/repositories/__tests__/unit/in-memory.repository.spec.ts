import { Entity } from '../../../entities/entity';
import { InMemoryRepository } from '../../in-memory.repository';

type StubEntityProps = {
  name: string;
  price: number;
};

class StubEntity extends Entity<StubEntityProps> {}

class StubInMemoryRepository extends InMemoryRepository<StubEntity> {}

describe('InMemoryRepository unit tests', () => {
  let sut: StubInMemoryRepository;

  beforeEach(() => {
    sut = new StubInMemoryRepository();
  });

  it('Should save a new entity', async () => {
    const entity = new StubEntity({ name: 'name', price: 10 });
    await sut.save(entity);
    expect(entity.toJSON()).toStrictEqual(sut.items[0].toJSON());
  });
});
