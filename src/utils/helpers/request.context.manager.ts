import { RequestContext } from '@mikro-orm/core';
import { EntityManager, PostgreSqlDriver } from '@mikro-orm/postgresql';
​
export class RequestContextManager {
  private static em: EntityManager<PostgreSqlDriver>;
​
  public static getEm(): EntityManager<PostgreSqlDriver> {
    return RequestContextManager.em ?? (RequestContext.getEntityManager() as EntityManager<PostgreSqlDriver>);
  }
}
​
export const { getEm } = RequestContextManager;