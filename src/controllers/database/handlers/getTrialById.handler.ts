import { SearchQuery } from '../../../contracts/search.query';
import { Trial } from '../../../entities/trial.entity';
import Container from '../../../utils/helpers/container';

export const getTrialById = async (trialId: string) => {
  const em = Container.getEm();
  const trial = await em.findOneOrFail(Trial, { id: trialId });
  return trial;
};
