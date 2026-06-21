import app from './app';
import { config } from './http_config';

app.listen(config.connection.port, () => console.log('listening on ', config.connection.port));