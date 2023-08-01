import { SearchQuery } from '../../../contracts/search.query';
import { Trial } from '../../../entities/trial.entity';
import Container from '../../../utils/helpers/container';

export const getTrials = async (query: SearchQuery) => {
  const em = Container.getEm();
  const params = {
    ...(query.icdCode ? { icdCodes: { value: query.icdCode } } : {}),
    ...(query.country ? { locations: { country: query.country } } : {}),
  };
  const [items, count] = await em.findAndCount(Trial, params);
  return { items, count };
};
