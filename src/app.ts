import { MikroORM, RequestContext } from "@mikro-orm/core";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";
import express, { Application } from "express";
import ormConfig from "./orm.config";
import { TrialService } from "./services/trial.service/trial.service";
import { CureWikiService } from "./services/curewiki.service/curewiki.service";
import { NextFunction, Request, Response } from "express";


export class App {
    host: Application;
    public orm: MikroORM<PostgreSqlDriver>;
    trialService: TrialService;
    cureWikiService: CureWikiService;

    constructor() {
        this.trialService = new TrialService();
        this.cureWikiService = new CureWikiService();
    }

    public async createConnection() {
        try {
          this.orm = await MikroORM.init(ormConfig);
        } catch (error) {
          console.log('Error while connecting to the database', error);
        }
        console.log('Connection to database established')
    }

    public async run() {
        const res = await this.trialService.getAllTrials(4, 5);
        await this.cureWikiService.storeTrials(res, this.orm)

        console.log('Done')
    }
}