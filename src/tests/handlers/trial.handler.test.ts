import { expect } from 'chai';
import { getTrialById } from '../../controllers/database/handlers/getTrialById.handler';
import { Trial } from '../../entities/trial.entity';
import { HandlerTestBase } from '../utils/handlerTestBase';
import { getTrials } from '../../controllers/database/handlers/getTrials.handler';
import { SearchQuery } from '../../contracts/search.query';
import { EntityManager, PostgreSqlDriver } from '@mikro-orm/postgresql';

describe('Handler tests', () => {
  describe('trial Handler tests', () => {
    let base = new HandlerTestBase();
    let em: EntityManager<PostgreSqlDriver>;

    after(async () => base.after());
    before(async () => ({ base } = await HandlerTestBase.before()));

    beforeEach(async () => {
      em = await base.beforeEach();
    });
    afterEach(() => base.afterEach());

    it('should return the trial when id is asked', async () => {
      const trial = await em.findOneOrFail(Trial, { id: '123' });
      const trialResponse = await getTrialById(trial.id);
      expect(trialResponse.id).equals(trial.id);
      expect(trialResponse.officialTitle).equals(trial.officialTitle);
      expect(trialResponse.briefTitle).equals(trial.briefTitle);
    });

    it('should throw error for non existing id', async () => {
      try {
        const trialResponse = await getTrialById('IdNotExist');
      } catch {
        return;
      }
      expect(true, 'should have thrown an error').false;
    });

    it('should get all trials containing the correct icdCode', async () => {
      const query: SearchQuery = { icdCode: '123' };
      const trialsResponse = await getTrials(query);
      expect(trialsResponse.count).equals(3);
    });

    it('should get all trials containing the correct country', async () => {
      const query: SearchQuery = { country: 'belgium' };
      const trialsResponse = await getTrials(query);
      expect(trialsResponse.count).equals(3);
    });

    it('should get no trials containing the country with upper case letter', async () => {
      const query: SearchQuery = { country: 'Belgium' };
      const trialsResponse = await getTrials(query);
      expect(trialsResponse.count).equals(0);
    });

    it('should get all trials containing the correct country and icdCode', async () => {
      const query: SearchQuery = { icdCode: '123', country: 'belgium' };
      const trialsResponse = await getTrials(query);
      expect(trialsResponse.count).equals(3);
    });
  });
});
