import { MikroORM, RequestContext } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import express, { Application } from 'express';
import ormConfig from './orm.config';
import { NextFunction, Request, Response } from 'express';
import Container from './utils/helpers/container';
import { useExpressServer } from 'routing-controllers';
import { TrialController } from './controllers/database/trial.controller';
import 'reflect-metadata';
import { TrialRetriever } from './components/trial.retriever/trial.retriever';
import { CureWikiDatabaseController } from './components/curewiki.database.controller/curewiki.database.controller';
import { StudyIcdCodeLinker } from './components/study.icdcode.linker/study.icdcode.linker';

export class App {
  host: Application;
  orm: MikroORM<PostgreSqlDriver>;
  trialRetriever: TrialRetriever;
  cureWikiDatabaseController: CureWikiDatabaseController;
  studyIcdCodeLinker: StudyIcdCodeLinker;
  app: express.Application;

  constructor() {
    this.host = express();
    this.host.use(express.json());

    this.host.use((req: Request, res: Response, next: NextFunction) => {
      console.log(req.method, req.url);
      next();
    });

    this.initializeControllers([TrialController]);

    this.trialRetriever = new TrialRetriever();
    this.cureWikiDatabaseController = new CureWikiDatabaseController();
    this.studyIcdCodeLinker = new StudyIcdCodeLinker();
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

  private initializeControllers(controllers: Function[]) {
    useExpressServer(this.host, {
      // Link the express host to routing-controllers
      cors: {
        origin: '*', // Allow all origins, any application on any url can call our api. This is why we also added the `cors` package.
        exposedHeaders: ['x-auth'], // Allow the header `x-auth` to be exposed to the client. This is needed for the authentication to work later.
      },
      controllers, // Provide the controllers. Currently this won't work yet, first we need to convert the Route to a routing-controllers controller.
      defaultErrorHandler: false, // Disable the default error handler. We will handle errors through papi later.
      routePrefix: '/api', // Map all routes to the `/api` path.
    });
  }

  public async run() {
    const rawBatch = await this.trialRetriever.getTrialBatch(1);
    console.log('Fetched batch');
    const processedBatch = this.studyIcdCodeLinker.addIcdCodes(rawBatch.studies);
    console.log('Processed batch');
    await this.cureWikiDatabaseController.storeTrials(processedBatch);
    console.log('Done');
  }
}
