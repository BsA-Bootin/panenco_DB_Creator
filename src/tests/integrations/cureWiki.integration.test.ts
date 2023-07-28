import { expect } from 'chai';
import { MikroORM } from '@mikro-orm/core';
import ormConfig from '../../orm.config';
import supertest from 'supertest';
import { IntegrationTestBase } from '../utils/integrationTestBase';

describe('trial integration tests', () => {
  let base: IntegrationTestBase;
  let request: supertest.SuperTest<supertest.Test>;

  before(async () => {
    base = new IntegrationTestBase();
    request = await base.getRequestForAllRouters();
    await base.before();
  });

  beforeEach(() => base.beforeEach());

  it('store and get one batch test', async () => {
    const res = await IntegrationTestBase.app.trialService.getTrialBatch(1);
    expect(res.studies.length).equals(1);
    await IntegrationTestBase.app.cureWikiService.storeTrials(res.studies);
  });
});
