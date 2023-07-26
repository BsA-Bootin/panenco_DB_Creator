import { MikroORM, RequestContext } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Trial } from '../../entities/trial.entity';
import { getEm } from '../../utils/helpers/request.context.manager';

export class CureWikiService {
  public async storeTrials(trials: any[], orm: MikroORM<PostgreSqlDriver>) {
    const em = orm.em.fork();
    // const em = getEm();
    trials.forEach(async (element) => {
      const trialEntityBody = {
        nctId: String(element.protocolSection.identificationModule.nctId),
        title: String(element.protocolSection.identificationModule.officialTitle),
        ICD_code: 'not yet generated',
      };
      const trial = em.create(Trial, trialEntityBody);
      await em.persistAndFlush(trial);
    });
  }
}
