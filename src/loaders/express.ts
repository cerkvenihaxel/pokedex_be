import express from 'express';
import cors from 'cors';
import routes from '../api';
import config from '../config';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './swagger';
export default ({ app }: { app: express.Application }) => {
  /**
   * Health Check endpoints
  */
  app.get('/status', (req, res) => {
    res.send('Everything looks good!');
    res.status(200).end();
  });
  app.head('/status', (req, res) => {
    res.status(200).end();
  });

  app.enable('trust proxy');

  app.use(cors());

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  // Transforms the raw string of req.body into json
  app.use(express.json());
  // Load API routes
  app.use(config.api.prefix, routes());

  /// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err: any = new Error('Not Found');
    err.status = 404;
    next(err);
});


};