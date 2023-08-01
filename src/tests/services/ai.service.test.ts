import { expect } from 'chai';
import { study } from './information/ai.service.test.information';
import { StudyIcdCodeLinker } from '../../components/study.icdcode.linker';

describe('ai service tests', () => {
  const studyIcdCodeLinker = new StudyIcdCodeLinker();

  it('processIcdCodes works as expected', () => {
    const processedCondition = studyIcdCodeLinker.preProcessConditions(conditionsModule.conditions[0]);
    expect(processedCondition).equals('triple negative breast cancer');
  });

  it('getIcdCodes works as expected', () => {
    const icdCodes = studyIcdCodeLinker.getIcdCodes(study);
    expect(icdCodes[0]).equals('H91');
  });
});

const conditionsModule = { conditions: ['Triple Negative Breast Cancer'] };
