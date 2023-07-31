import type { Faker } from '@faker-js/faker';
import { faker } from '@faker-js/faker';
import { BaseEntity, Constructor, EntityManager, RequiredEntityData } from '@mikro-orm/core';
import { ManyRelatedProperties, ProcessedProperties, Properties } from './utils/factories.types';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import Container from '../utils/helpers/container';
import { factoryMap } from './utils/factory.map';
import { EntityBaseType } from '../utils/entities/base.entity';

export abstract class BaseFactory<T extends EntityBaseType> {
  protected em: EntityManager<PostgreSqlDriver>;
  constructor(em?: EntityManager<PostgreSqlDriver>) {
    this.em = em || Container.getEm();
  }
  readonly model: Constructor<T>;

  protected abstract definition(faker: Faker, overrideParameters?: Properties<T>): ProcessedProperties<T>;

  isModel(overrideParameters: any): overrideParameters is T {
    return overrideParameters instanceof this.model;
  }

  private makeEntity(overrideParameters?: Properties<T>): T {
    // Extract defaults
    const definition = this.definition(faker, overrideParameters);

    // Extract all foreign key related entities. If these are defined in the definition, they should override `overrideParameters`. One must make sure that `this.definition` correctly passes through foreign keys.
    const foreignProps = Object.fromEntries(
      Object.entries(definition).filter(([_, value]) => {
        return value instanceof BaseEntity;
      })
    );

    const overriddenProps = { ...definition, ...overrideParameters };

    // Extract all ManyToXXX related properties
    const [normal, manyRelatedProps] = this.splitProperties(overriddenProps as any); // todo: fix this

    // The order here is important, we want overrideParameters to override only scalar properties and not the foreign keys.
    const properties = {
      ...normal,
      ...foreignProps,
    };

    const entity = this.em.create(this.model, properties) as T;

    // Assign all many related properties
    Object.keys(manyRelatedProps!).forEach((key) => {
      const relatedEntity: Constructor<EntityBaseType> = entity[key].property.entity();

      const relatedEntities = manyRelatedProps![key].map((prop) => {
        if (prop instanceof relatedEntity) {
          return prop;
        }
        const factoryConstructor = factoryMap.get(relatedEntity);
        if (factoryConstructor !== undefined) {
          const factory = new factoryConstructor();
          return factory.makeOne(prop);
        }
        return this.em.create(relatedEntity, prop);
      });
      entity[key].add(...relatedEntities);
    });

    return entity;
  }

  /**
   * Make a single entity and persist (not flush)
   * @param overrideParameters Object specifying what default attributes of the entity factory should be overridden
   */
  makeOne(overrideParameters?: T | Properties<T>, defaults?: Properties<T>) {
    if (this.isModel(overrideParameters)) {
      return overrideParameters;
    }
    if (overrideParameters === null) {
      return null;
    }
    if (defaults) {
      Object.assign(defaults, overrideParameters);
      overrideParameters = defaults;
    }
    const entity = this.makeEntity(overrideParameters as Properties<T>);
    this.em.persist(entity);
    return entity;
  }

  /**
   * Make multiple entities and then persist them (not flush)
   * @param amount Number of entities that should be generated
   * @param overrideParameters Object specifying what default attributes of the entity factory should be overridden
   */
  make(amount: number, overrideParameters?: T | Properties<T>, defaults?: Properties<T>) {
    const entities = [...Array(amount)].map(() => this.makeOne(overrideParameters, defaults));
    return entities;
  }

  /**
   * Create (and flush) a single entity
   * @param overrideParameters Object specifying what default attributes of the entity factory should be overridden
   */
  async createOne(overrideParameters?: T | Properties<T>, defaults?: Properties<T>) {
    const entity = this.makeOne(overrideParameters, defaults);
    await this.em.flush();
    this.em.clear();
    return entity;
  }

  /**
   * Create (and flush) multiple entities
   * @param amount Number of entities that should be generated
   * @param overrideParameters Object specifying what default attributes of the entity factory should be overridden
   */
  async create(amount: number, overrideParameters?: T | Properties<T>, defaults?: Properties<T>) {
    const entities = this.make(amount, overrideParameters, defaults);
    await this.em.flush();
    this.em.clear();
    return entities;
  }

  /**
   * Splits properties is normal properties and properties that are represented as a collection on the model
   * @param overrideParameters the properties to split
   * @returns An array containing the normal properties as a first item and collections properties as the second itthis.em.
   */
  private splitProperties(overrideParameters?: Properties<T>) {
    if (overrideParameters === undefined) {
      return [undefined, undefined];
    }
    const normalProperties = {};
    const relatedProperties: ManyRelatedProperties<T> = {};

    Object.keys(overrideParameters).forEach((key) => {
      if (overrideParameters[key] instanceof Array) {
        relatedProperties[key] = overrideParameters[key];
      } else {
        normalProperties[key] = overrideParameters[key];
      }
    });

    // We have to cast to RequiredEntityData since these are the properties used to create the entity
    return [normalProperties as RequiredEntityData<T>, relatedProperties];
  }
}
