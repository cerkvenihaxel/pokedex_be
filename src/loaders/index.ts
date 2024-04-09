import Logger from './logger';
import expressLoader from './express';
//We have to import at least all the events once so they can be triggered

export default async ({ expressApp }:{expressApp:any}) => {
  expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');
};