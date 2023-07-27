import supertest from 'supertest';
import { App } from '../../app';
import type * as express from 'express';
import { MockedServiceWorker, type Options as ServiceWorkerOptions } from './mockedServiceWorker';
import { TestDbDataService } from './testDBDataService';
import Container from '../../utils/helpers/container';

type Options = {
  serviceWorker?: ServiceWorkerOptions;
};

export class IntegrationTestBase {
  public static app: App;
  private request: supertest.SuperTest<supertest.Test>;
  private testDbDataService: TestDbDataService;
  readonly #serviceWorker: MockedServiceWorker;

  constructor(options?: Options) {
    this.#serviceWorker = new MockedServiceWorker(options?.serviceWorker);
  }

  get serviceWorker() {
    return this.#serviceWorker;
  }

  public async before() {
    await this.testDbDataService.loadTransactionalFixtures();
    this.serviceWorker.setupMockedServices();
  }

  public async beforeEach() {
    await this.testDbDataService.startTestTransaction();
  }

  public async afterEach() {
    this.serviceWorker.resetMockedServices();
    await this.testDbDataService.rollBackTestTransaction();
  }

  public async after() {
    this.serviceWorker.closeMockedServices();
  }

  public async getRequestForAllRouters(): Promise<supertest.SuperTest<supertest.Test>> {
    if (!IntegrationTestBase.app) {
      IntegrationTestBase.app = new App();
      await IntegrationTestBase.app.createConnection();
      await Container.registerEm(IntegrationTestBase.app.orm.em);
    }
    this.testDbDataService = new TestDbDataService(IntegrationTestBase.app.orm);
    const request = this.getAndSetRequest(IntegrationTestBase.app.app);

    return request;
  }

  private getAndSetRequest(host: express.Application): supertest.SuperTest<supertest.Test> {
    if (!this.request) {
      this.request = supertest(host);
    }
    return this.request;
  }
}
