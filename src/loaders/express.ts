import express from 'express';
import cors from 'cors';
import routes from '../api';
import config from '../config';

export default ({ app }: { app: express.Application }) => {
  /**
   * Health Check endpoints
  */
  app.get('/status', (req, res) => {
    res.status(200).end();
  });
  app.head('/status', (req, res) => {
    res.status(200).end();
  });

  app.enable('trust proxy');


  app.use(cors());

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