import express, { Request, Response } from 'express';
import errorHandler from './middlewares/error.middleware';
import { notFound } from './middlewares/notFound.middleware';
import { RBAC } from './middlewares/rule.middleware';
import { workflows } from './workflows';

const app = express();

const PORT = process.env.PORT ?? 5000;

const { path, ip, roles } = workflows[1].rules;

app.use(RBAC(path, ip, roles));

app.get('/admin', (_request: Request, response: Response) => {
  response.status(200).send({ message: 'Access granted' });
});

app.get('/admin/*', (_request: Request, response: Response) => {
  response.status(200).send({ message: 'Access granted' });
});

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`RuBAC service running on port ${PORT}`);
});

export default app;
