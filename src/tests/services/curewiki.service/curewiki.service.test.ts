import { expect } from "chai"
import { TrialService } from "../../../services/trial.service/trial.service"
import { CureWikiService } from "../../../services/curewiki.service/curewiki.service"

describe('CureWiki service tests', () => {
    let cureWikiService: CureWikiService;
    before(() => {
        cureWikiService = new CureWikiService;
    })
})