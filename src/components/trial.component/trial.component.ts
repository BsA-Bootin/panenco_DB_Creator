import axios from 'axios';
import { StudyInfo } from '../../shared/typings/trial.typing';

const CLINICAL_URL = 'https://clinicaltrials.gov/api/v2/studies';
const MAX_RETRIES = 3;
export class TrialService {
  public async getTrial(id: string) {
    const response = await axios.get(`${CLINICAL_URL}/${id}`);
    return response;
  }

  public async getTrialBatch(batchSize: number, pageToken?: string) {
    const { rawStudies, nextPageToken } = await this.getRawStudies(batchSize, pageToken);
    const studies = rawStudies.map(this.getStudyInfo);
    return { studies, nextPageToken };
  }

  private async getRawStudies(batchSize: number, pageToken?: string) {
    const filterParams = {
      'query.locn': 'antwerp',
    };
    let count = 0;
    while (count < MAX_RETRIES) {
      const response = await axios.get(CLINICAL_URL, {
        params: {
          pageSize: batchSize,
          ...(pageToken ? { pageToken } : {}),
          ...filterParams,
        },
      });
      if (response.status !== 200) {
        count++;
        continue;
      }
      return { rawStudies: response.data.studies, nextPageToken: response.data.nextPageToken };
    }
    return {};
  }

  private getStudyInfo(study: any): StudyInfo {
    const conditionsInfo = {
      conditions: study.protocolSection.conditionsModule.conditions,
      keywords: study.protocolSection.conditionsModule.keywords,
    };

    const generalInfo = study.protocolSection.identificationModule;
    const status = study.protocolSection.statusModule.overallStatus;
    const locations = study.protocolSection.contactsLocationsModule.locations;

    return { generalInfo, conditionsInfo, status, locations };
  }
}
