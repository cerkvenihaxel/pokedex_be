// index.ts
import express from "express";
import config from "./config";
import Logger from './loaders/logger';
import loaders from './loaders';

const startServer = async () => {
    const app = express();
    await loaders({ expressApp: app });
    return app.listen(config.port, () => {
      Logger.info(`
        ################################################
        🛡️  Server listening on port: ${config.port} 🛡️
        ################################################
      `);
    }).on('error', err => {
      Logger.error(err);
      process.exit(1);
    });
}

if (require.main === module) {
    startServer();
}

export default startServer;
