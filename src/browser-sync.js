import browserSync from 'browser-sync';
import settings from './settings';

browserSync({
  codeSync: true,
  server: `${process.cwd()}/${settings.buildDir}`,
});
