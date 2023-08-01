import { EntityManager, MikroORM } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import Container from '../../utils/helpers/container';
import { TrialFactory } from '../../factories/trial.factory';
import { Trial } from '../../entities/trial.entity';

export class TestDbDataService {
  private static isLoaded: boolean;
  private orm: MikroORM<PostgreSqlDriver>;

  constructor(orm: MikroORM<PostgreSqlDriver>) {
    this.orm = orm;
  }

  public async loadFixtures(): Promise<void> {
    const em = Container.getEm().fork();
    await em.execute(`DROP SCHEMA public CASCADE; CREATE SCHEMA public;`);
    await this.orm.getMigrator().up();
    const trials = new TrialFactory(em).make(1, {
      id: '123',
    });
    await em.persistAndFlush(trials);
    const newtrials = new TrialFactory(em).make(3, {
      icdCodes: [{ value: '123' }],
      locations: [{ country: 'belgium' }],
    });
    await em.persistAndFlush(newtrials);
    const trial = await em.findOneOrFail(Trial, { id: '123' });
    Container.registerEm(em);
  }

  public async loadTransactionalFixtures(): Promise<void> {
    if (TestDbDataService.isLoaded) {
      return;
    }
    await this.loadFixtures();
    TestDbDataService.isLoaded = true;
  }

  originalEm: EntityManager<PostgreSqlDriver>;
  public async startTestTransaction() {
    await this.loadTransactionalFixtures();

    this.originalEm = Container.getEm();
    this.originalEm.clear();
    const forkedEm = this.originalEm.fork();

    await forkedEm.begin({ ctx: this.originalEm.getTransactionContext() });
    Container.registerEm(forkedEm);
    return forkedEm;
  }

  public async rollBackTestTransaction() {
    await Container.getEm().rollback();
  }
}
