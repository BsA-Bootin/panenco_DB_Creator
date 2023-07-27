import { MikroORM, RequestContext } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import express, { Application } from 'express';
import ormConfig from './orm.config';
import { TrialService } from './services/trial.service/trial.service';
import { CureWikiService } from './services/curewiki.service/curewiki.service';
import { NextFunction, Request, Response } from 'express';
import Container from './utils/helpers/container';

export class App {
  host: Application;
  public orm: MikroORM<PostgreSqlDriver>;
  trialService: TrialService;
  cureWikiService: CureWikiService;
  public app: express.Application;

  constructor() {
    this.app = express();
    this.trialService = new TrialService();
    this.cureWikiService = new CureWikiService();
  }

  public async createConnection() {
    try {
      this.orm = await MikroORM.init(ormConfig);
      Container.registerEm(this.orm.em);
    } catch (error) {
      console.log('Error while connecting to the database', error);
    }
    console.log('Connection to database established');
  }

  public async run() {
    const res = await this.trialService.getTrialBatch(1);
    await this.cureWikiService.storeTrials(res.studies);

    console.log('Done');
  }
}
