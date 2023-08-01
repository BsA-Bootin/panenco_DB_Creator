import { expect } from 'chai';
import { MikroORM } from '@mikro-orm/core';
import ormConfig from '../../orm.config';
import supertest from 'supertest';
import { IntegrationTestBase } from '../utils/integrationTestBase';
import Container from '../../utils/helpers/container';
import { Trial } from '../../entities/trial.entity';
import { ICDCode } from '../../entities/icdcodes.entity';

describe('trial integration tests', () => {
  let base: IntegrationTestBase;
  let request: supertest.SuperTest<supertest.Test>;

  before(async () => {
    base = new IntegrationTestBase();
    request = await base.getRequestForAllRouters();
    await base.before();
  });

  beforeEach(() => base.beforeEach());

  after(() => {
    base.after();
  });

  afterEach(() => {
    base.afterEach();
  });

  it('store and get one batch test', async () => {
    const em = Container.getEm();
    const unProcessedTrials = await IntegrationTestBase.app.trialRetriever.getTrialBatch(2);
    expect(unProcessedTrials.studies.length).equals(2);
    const processedTrials = IntegrationTestBase.app.studyIcdCodeLinker.addIcdCodes(unProcessedTrials.studies);
    const originalCount = await em.count(Trial);
    await IntegrationTestBase.app.cureWikiDatabaseStore.storeTrials(processedTrials);
    const [trials, count] = await em.findAndCount(
      Trial,
      {},
      { populate: ['locations.country', 'locations.city', 'icdCodes.value'] }
    );
    expect(count).equals(originalCount + 2);
    expect(trials.some((trial) => trial.id === 'NCT03630471'));
    expect(trials.some((trial) => trial.id === 'NCT03841708'));
    expect(trials.some((trial) => trial.locations[0].country === 'india'));
    expect(trials.some((trial) => trial.locations[0].city === 'bruxelles'));
    const icdCount = await em.count(ICDCode, { value: 'I46' });
    expect(icdCount).equals(1);
  });
});
