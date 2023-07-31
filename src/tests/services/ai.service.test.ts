import { AIService } from '../../components/ai.component/ai.component';
import { expect } from 'chai';
import { study } from './information/ai.service.test.information';

describe('ai service tests', () => {
  const aiService = new AIService();

  it('processIcdCodes works as expected', () => {
    const processedCondition = aiService.preProcessConditions(conditionsModule.conditions[0]);
    expect(processedCondition).equals('triple negative breast cancer');
  });

  it('getIcdCodes works as expected', () => {
    const icdCodes = aiService.getIcdCodes(study);
    expect(icdCodes[0]).equals('H91');
  });
});

const conditionsModule = { conditions: ['Triple Negative Breast Cancer'] };
