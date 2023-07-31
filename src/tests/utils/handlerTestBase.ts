import { MikroORM } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { TestBase } from './testBase';
import Container from '../../utils/helpers/container';
import ormConfig from '../../orm.config';
import { setFixtureDate } from '../../utils/helpers/data.helper';

export class HandlerTestBase extends TestBase {
  public orm!: MikroORM<PostgreSqlDriver>;

  public createConnection = async () => {
    try {
      this.orm = (await MikroORM.init(ormConfig)) as MikroORM<PostgreSqlDriver>;
      Container.registerEm(this.orm.em);
    } catch (error) {
      console.log('Error while connecting to the database', error);
      throw error;
    }
    this.setTestDbService(this.orm);
    setFixtureDate();
  };

  public after = async () => {
    await this.closeConnection();
  };

  public closeConnection = async () => {
    try {
      await this.orm.close();
    } catch (error) {
      console.log('Error while closing the connection to the database', error);
      throw error;
    }
  };

  public static before = async () => {
    const base = new HandlerTestBase();
    await base.createConnection();
    const em = Container.getEm();
    return { base, em };
  };
}
