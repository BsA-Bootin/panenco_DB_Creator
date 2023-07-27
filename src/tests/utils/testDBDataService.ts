import { MikroORM } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';

import Container from '../../utils/helpers/container';

export class TestDbDataService {
  private static isLoaded: boolean;
  private orm: MikroORM<PostgreSqlDriver>;

  constructor(orm: MikroORM<PostgreSqlDriver>) {
    this.orm = orm;
  }

  public async loadFixtures(): Promise<void> {
    await this.orm.em.execute(`DROP SCHEMA public CASCADE; CREATE SCHEMA public;`);
    await this.orm.getMigrator().up();
  }

  public async loadTransactionalFixtures(): Promise<void> {
    if (TestDbDataService.isLoaded) {
      return;
    }
    await this.loadFixtures();
    TestDbDataService.isLoaded = true;
  }

  public async startTestTransaction() {
    await this.loadTransactionalFixtures();
    Container.getEm().clear();
    await Container.getEm().begin();
  }

  public async rollBackTestTransaction() {
    await Container.getEm().rollback();
  }
}
