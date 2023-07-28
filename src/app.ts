import { MikroORM, RequestContext } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import express, { Application } from 'express';
import ormConfig from './orm.config';
import { TrialService } from './services/trial.service/trial.service';
import { CureWikiService } from './services/curewiki.service/curewiki.service';
import { NextFunction, Request, Response } from 'express';
import Container from './utils/helpers/container';
import { AIService } from './services/ai.service/ai.service';
import { useExpressServer } from 'routing-controllers';
import { TrialController } from './controllers/database/database.controller';

export class App {
  host: Application;
  public orm: MikroORM<PostgreSqlDriver>;
  trialService: TrialService;
  cureWikiService: CureWikiService;
  aiService: AIService;
  public app: express.Application;

  constructor() {
    this.app = express();
    this.host.use(express.json());

    this.host.use((req: Request, res: Response, next: NextFunction) => {
      console.log(req.method, req.url);
      next();
    });

    this.initializeControllers([TrialController]);

    this.trialService = new TrialService();
    this.cureWikiService = new CureWikiService();
    this.aiService = new AIService();
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
    const rawBatch = await this.trialService.getTrialBatch(2);
    console.log('Fetched batch');
    const processedBatch = this.aiService.addIcdCodes(rawBatch.studies);
    console.log('Processed batch');
    await this.cureWikiService.storeTrials(processedBatch);
    console.log('Done');
  }
}
