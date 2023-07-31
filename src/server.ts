import { App } from './app';

(async () => {
  const app = new App();
  await app.createConnection();
  await app.run();
})();
