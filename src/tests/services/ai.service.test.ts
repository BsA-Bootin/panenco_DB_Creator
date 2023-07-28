import { AIService } from '../../services/ai.service/ai.service';
import { expect } from 'chai';

describe('ai service tests', () => {
  const aiService = new AIService();

  it('processIcdCodes works as expected', () => {
    const processedCondition = aiService.preProcessConditions(conditionsModule.conditions[0]);
    expect(processedCondition).equals('triple negative breast cancer');
  });

  //   it('requestIcdCodes works as expected', () => {
  //     const requestedIcdCodes = aiService.requestIcdCodes('triple negative breast cancer');
  //     expect(requestedIcdCodes).equals(true);
  //   });
});

const conditionsModule = { conditions: ['Triple Negative Breast Cancer'] };
