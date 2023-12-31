import { MikroORM, RequestContext } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Trial } from '../../entities/trial.entity';
import { Location } from '../../entities/locations.entity';
import Container from '../../utils/helpers/container';
import { StudyInfoComplete } from '../../shared/typings/trial.typing';
import { ICDCode } from '../../entities/icdcodes.entity';

export class CureWikiService {
  public async storeTrials(trials: StudyInfoComplete[]) {
    const em = Container.getEm().fork();
    trials.forEach((element) => {
      const trialEntityBody = {
        id: element.generalInfo.nctId,
        officialTitle: element.generalInfo.officialTitle,
        briefTitle: element.generalInfo.briefTitle,
        status: element.status,
      };
      const trialEntity = em.create(Trial, trialEntityBody);
      em.persist(trialEntity);

      element.icdCodes.forEach((icdCode) => {
        const icdCodeEntityBody = {
          icdCode: icdCode,
          trial: trialEntity.id,
        };
        const icdCodeEntity = em.create(ICDCode, icdCodeEntityBody);
        em.persist(icdCodeEntity);
      });

      element.locations.forEach((location) => {
        const locationsEntityBody = {
          country: location.country.toLowerCase(),
          zip: location.zip,
          city: location.city.toLowerCase(),
          trial: trialEntity.id,
        };
        const locationEntity = em.create(Location, locationsEntityBody);
        em.persist(locationEntity);
      });
    });
    await em.flush();
  }
}
