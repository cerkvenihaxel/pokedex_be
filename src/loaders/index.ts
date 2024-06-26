import Logger from './logger';
import expressLoader from './express';
export default async ({ expressApp }:{expressApp:any}) => {
  expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');
};