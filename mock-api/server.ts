import express from 'express';
import AuthRouter from './routes/auth-route.ts';
const MOCK_API_PORT = process.env.MOCK_API_PORT || 3001;
const app = express();

app.use('/auth', AuthRouter);

app.listen(MOCK_API_PORT, () =>
  console.log(`Mock api running at ${MOCK_API_PORT}`)
);
