import express from 'express';
import { nodesRouter } from './routes/nodes';
import { edgesRouter } from './routes/edges';
import { queriesRouter } from './routes/queries';

const app = express();
app.use(express.json());

app.use('/nodes', nodesRouter);
app.use('/edges', edgesRouter);
app.use('/queries', queriesRouter);

export default app;