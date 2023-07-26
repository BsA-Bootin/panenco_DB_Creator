import { expect } from "chai"
import { MikroORM } from "@mikro-orm/core"
import { PostgreSqlDriver } from "@mikro-orm/postgresql"
import { CureWikiService } from "../../services/curewiki.service/curewiki.service"
import { TrialService } from "../../services/trial.service/trial.service"
import ormConfig from "../../orm.config"

describe('trial integration tests', () => {
    let trialService: TrialService
    let cureWikiService: CureWikiService
    let orm: MikroORM<PostgreSqlDriver>
    before(async () => {
        trialService = new TrialService;
        cureWikiService = new CureWikiService;
        orm = await MikroORM.init(ormConfig);
        await orm.em.execute(`DROP SCHEMA public CASCADE; CREATE SCHEMA public;`);
        await orm.getMigrator().up();
    })

    it('getAllTrials test',async () => {
        const res = await trialService.getAllTrials(5,4);
        expect(res.length).equals(25);
        await cureWikiService.storeTrials(res, orm);
    })
})