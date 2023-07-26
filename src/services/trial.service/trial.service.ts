import axios from 'axios';

export class TrialService {
  public async getTrial(id: string) {
    const response = await axios.get(`https://clinicaltrials.gov/api/v2/studies/${id}`);
    return response;
  }

  public async getTrialBatch(batchSize: number) {
    const response = await axios.get('https://clinicaltrials.gov/api/v2/studies', {
      params: {
        pageSize: batchSize,
      },
    });
    const studies = response.data.studies;
    const type = typeof studies;
    return studies;
  }

  public async getAllTrials(batchSize: number = 100, amountOfBatches: number = -1) {
    const params = {
      pageSize: batchSize,
      'filter.ids': 'NCT04951271,NCT03630471,NCT05843071,NCT01125371,NCT02554071',
    };
    const firstResponse = await axios.get('https://clinicaltrials.gov/api/v2/studies', { params });
    let studies = firstResponse.data.studies;
    let nextPageToken = firstResponse.data.nextPageToken;
    let retries = 10; // safety measure
    while ((amountOfBatches > 0 || amountOfBatches === -1) && retries > 0) {
      const params = {
        pageSize: batchSize,
        pageToken: nextPageToken,
        'filter.ids': 'NCT04951271,NCT03630471,NCT05843071,NCT01125371,NCT02554071',
      };
      const response = await axios.get('https://clinicaltrials.gov/api/v2/studies', { params });
      if (response.status === 200) {
        nextPageToken = response.data.nextPageToken;
        studies.push.apply(studies, response.data.studies);
        amountOfBatches -= 1;
        retries = retries - 1;
        if (nextPageToken === undefined) {
          amountOfBatches = 0;
        }
      } else {
        retries -= 1;
      }
    }
    return studies;
  }
}
