import setupApp from './app';

const app = setupApp();
app.listen(Number(process.env.SERVER_PORT), () => console.log('listening on ', process.env.SERVER_PORT));
