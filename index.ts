import { Application } from './deps.ts';
import { APP_HOST, APP_PORT } from './config.ts';
import router from './routing.ts';
import notFound from './middlewares/notFound.ts';
import errorMiddleware from './middlewares/error.ts';

const app = new Application();

app.use(errorMiddleware);
app.use(router.routes());
app.use(router.allowedMethods());
app.use(notFound);

console.log(`Listening on ${APP_PORT}...`);

await app.listen(`${APP_HOST}:${APP_PORT}`);
