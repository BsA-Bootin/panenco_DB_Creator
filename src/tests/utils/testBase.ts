import { MikroORM } from '@mikro-orm/core';
import { EntityManager, PostgreSqlDriver } from '@mikro-orm/postgresql';

import { faker } from '@faker-js/faker';
import { TestDbDataService } from './testDBDataService';
import { setFixtureDate } from '../../utils/helpers/data.helper';

export abstract class TestBase {
  protected testDbService: TestDbDataService;

  constructor() {
    setFixtureDate();
  }
  public setTestDbService(orm: MikroORM<PostgreSqlDriver>) {
    this.testDbService = new TestDbDataService(orm);
  }

  public async beforeEach(): Promise<EntityManager<PostgreSqlDriver>> {
    setFixtureDate();
    return this.testDbService.startTestTransaction();
  }
  public async afterEach(): Promise<void> {
    await this.testDbService.rollBackTestTransaction();
  }
}
