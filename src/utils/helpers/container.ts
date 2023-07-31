import { EntityManager } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';

export default class Container {
  static em: EntityManager<PostgreSqlDriver>;

  public static registerEm(em: EntityManager<PostgreSqlDriver>) {
    this.em = em;
  }

  public static getEm() {
    return this.em;
  }
}
