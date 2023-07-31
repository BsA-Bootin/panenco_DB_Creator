import { Constructor } from '@mikro-orm/core';
import { EntityConstructor, factoryMap } from '../../factories/utils/factory.map';
import { FactoryConstructor } from '../../factories/utils/factories.types';
import { EntityBaseType } from '../entities/base.entity';

export interface IFactoryOptions {
  default?: boolean; // If set, this factory overrides other factories with the same model in the factory map
  disableRegistry?: boolean; // If set to true, this factory is not registered in the factory registry and can not be auto-discoverd from its entity
  mappedEntities?: EntityConstructor<EntityBaseType>[]; // A list of additional entities that should be mapped to this factory. When creating entities, the factory still uses the entity as provided in the decorator.
}
export function Factory<T extends EntityBaseType>(model: Constructor<T>, options?: IFactoryOptions) {
  return function <U extends FactoryConstructor>(factory: U) {
    factory.prototype.model = model;
    if (!options?.disableRegistry && (options?.default || factoryMap.get(model) === undefined)) {
      factoryMap.set(model, factory);
    }
    if (options?.mappedEntities) {
      options.mappedEntities.forEach((entity) => {
        factoryMap.set(entity, factory);
      });
    }
  };
}
