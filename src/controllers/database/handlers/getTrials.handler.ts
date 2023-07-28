import { SearchQuery } from '../../../contracts/search.query';
import { Trial } from '../../../entities/trial.entity';
import Container from '../../../utils/helpers/container';

export const getTrials = async (query: SearchQuery) => {
  const em = Container.getEm();
  const [items, count] = await em.findAndCount(Trial, {
    icdCodes: { icdCode: query.icdCode },
    locations: { country: query.country },
  });
  return { items, count };
};
