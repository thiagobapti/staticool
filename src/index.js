#!/usr/bin/env node
// eslint-disable-next-line no-unused-vars
import colors from 'colors';
import config, { defaultConfig, localConfig } from './config';
import { loadPages } from './pages';
import logger from './logger';

logger.verbose('defaultConfig', defaultConfig);
logger.verbose('localConfig', localConfig);
logger.verbose('config', config);

logger.log('🆒', ' Staticool '.bgBlue, '🆒');

if (process.argv.includes('--d') || process.argv.includes('dev')) {
  logger.log(`${localConfig ? 'Custom-conf' : 'Zero-conf'} mode`);
  loadPages();
}
