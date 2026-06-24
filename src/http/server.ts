import { load_env } from '../env/load_env';

load_env()
import setup_app from './app';

const app = setup_app()
app.listen(Number(process.env.SERVER_PORT), () => console.log('listening on ', process.env.SERVER_PORT));