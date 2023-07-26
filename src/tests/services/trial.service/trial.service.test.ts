import { expect } from 'chai';
import { TrialService } from '../../../services/trial.service/trial.service';

describe('trial service tests', () => {
  let trialService: TrialService;
  before(() => {
    trialService = new TrialService();
  });

  it('getTrialBatch test', async () => {
    const res = await trialService.getTrialBatch(20);
    expect(res.length).equals(20);
  });

  it('getAllTrials test', async () => {
    const res = await trialService.getAllTrials(2, 3);
    expect(res.length).equals(5);
  });
});
