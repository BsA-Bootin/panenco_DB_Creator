import { query } from 'express';
import { Get, JsonController, Param, Params } from 'routing-controllers';
import { SearchQuery } from '../../contracts/search.query';
import { ListRepresenter, Query, Representer, StatusCode } from '@panenco/papi';
import { TrialView } from '../../contracts/trial.view';
import { getTrials } from './handlers/getTrials.handler';
import { getTrialById } from './handlers/getTrialById.handler';

@JsonController('/trials')
export class TrialController {
  @Get()
  @ListRepresenter(TrialView, StatusCode.ok)
  async getTrials(@Query() query: SearchQuery) {
    return getTrials(query);
  }

  @Get()
  @Representer(TrialView, StatusCode.ok)
  async getTrialById(@Param('id') trialId: string) {
    return getTrialById(trialId);
  }
}
