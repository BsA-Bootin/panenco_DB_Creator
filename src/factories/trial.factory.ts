import { Faker } from '@faker-js/faker';
import { Trial } from '../entities/trial.entity';
import { Factory } from '../utils/decorators/factory.decorator';
import { BaseFactory } from './base.factory';
import { Properties } from './utils/factories.types';
import { ICDCode } from '../entities/icdcodes.entity';

@Factory(Trial)
export class TrialFactory extends BaseFactory<Trial> {
  definition(faker: Faker, properties?: Properties<Trial>) {
    const locationEntity = {
      country: faker.location.country(),
      zip: faker.location.zipCode(),
      city: faker.location.city(),
    };
    const icdCodeEntity = {
      icdCode: faker.string.alpha(),
    };
    return {
      id: faker.string.uuid(),
      officialTitle: 'idk',
      briefTitle: 'idk',
      status: 'idk',
      locations: [locationEntity],
      icdCodes: [icdCodeEntity],
    };
  }
}
