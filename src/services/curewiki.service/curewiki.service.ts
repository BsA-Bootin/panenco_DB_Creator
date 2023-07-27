import { MikroORM, RequestContext } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Trial } from '../../entities/trial.entity';
import { StudyInfo, aiStudyInfo } from '../../shared/typings/trial.typing';
import Container from '../../utils/helpers/container';

export class CureWikiService {
  public async storeTrials(trials: aiStudyInfo[]) {
    const em = Container.getEm();
    trials.forEach(async (element) => {
      const trialEntityBody = {
        nctId: String(element.trialInfo.nctId),
        title: String(element.trialInfo.officialTitle),
        ICD_code: element.icd10Code,
      };
      const trial = em.create(Trial, trialEntityBody);
      await em.persistAndFlush(trial);
    });
  }
}
