import * as gulp from 'gulp';
/*
import * as chalk from 'chalk';
import * as request from 'request';
import * as fs from 'fs';
import * as readline from 'readline';
*/
import { Logger } from '../utils/logger';

/*
interface RequestProgressError {
  errno: string;
  code: string;
  syscall: string;
  hostname: string;
  host: string;
  port: number;
}
const progress = require('request-progress');
import * as transform from 'gulp-transform';
const prettysize = require('prettysize');
*/
const logger = new Logger();

/*
//#region Patterns
const SVG_PATTERN = /(<svg[^>]*) id="([^"]*)"/g;
//#endregion
let maxAttempts = 3;
let currentAttempt = 1;
let hideLoggerDebug = false;
*/
/**
 * @deprecated
 * @param value The value
 * @param search The regex
 * @param replacement The replacement
 */
function replaceAll(value: string, search: string, replacement: string) {
  return value.replace(new RegExp(search, 'g'), replacement);
}

/**
 * @deprecated
 * @param showFileTransfer Whether to show file transfer stats
 */
/*
function downloadIcons(showFileTransfer: boolean) {
  return progress(request('https://materialdesignicons.com/api/download/angularmaterial/38EF63D0-4744-11E4-B3CF-842B2B6CFE1B'))
    .on('progress', (state: { percent: number, size: { total: number, transferred: number } }) => {
      // tslint:disable-next-line:max-line-length
      // tslint:disable-next-line:no-shadowed-variable
      const progress = ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#'];
      progress.length = Math.ceil(state.percent * 25);
      if (showFileTransfer) {
        process.stdout.write(
          // tslint:disable-next-line:max-line-length
          chalk.default.blueBright(`${progress.join('')} | ${Math.ceil(state.percent * 100)}% | ${prettysize(state.size.transferred)}/${prettysize(state.size.total)} transferred`));
        readline.cursorTo(process.stdout, 0);
      } else {
        process.stdout.write(chalk.default.blueBright(`${progress.join('')} | ${Math.ceil(state.percent * 100)}%`));
        readline.cursorTo(process.stdout, 0);
      }
    })
    .on('error', (err: RequestProgressError) => {
      switch (err.errno) {
        case 'ENOTFOUND':
          logger.error('Could not establish an internet connection to the server.');
          break;
      }
      if (currentAttempt <= maxAttempts) {
        logger.info(`Attempt ${currentAttempt++}: Retrying download...`);
        setTimeout(() => {
          downloadIcons(showFileTransfer);
        }, 1000);
      } else {
        logger.error(`Could not retry download after a total of ${currentAttempt} attempts. Exiting..`);
        process.exit(1);
      }
    })
    .on('end', () => {
      readline.clearLine(process.stdout, 0);
      logger.success('Done downloading! Saved to src/assets/mdi.svg');
    })
    .pipe(fs.createWriteStream('src/assets/mdi.svg'));
}
*/

/**
 * Downloads icons from {@link https://materialdesignicons.com}
 * @deprecated
 * - Parameter `--file-tranfer`: Specify a boolean to show file transferring stats when downloading
 * - Parameter `--hide-debug`: Whether to hide debug logging
 * - Parameter `--attempts`: Sets the amount of attempts to try for before giving up
 */
/*
gulp.task('download-icons', () => {
  // tslint:disable-next-line:max-line-length
  let showFileTransfer = true;
  const i = process.argv.indexOf('--hide-debug');
  const j = process.argv.indexOf('--file-transfer');
  const k = process.argv.indexOf('--attempts');
  if (i > -1) {
    hideLoggerDebug = true;
  }
  if (j > -1) {
    if (['true', 'false'].indexOf(process.argv[j + 1]) > -1) {
      showFileTransfer = JSON.parse(process.argv[j + 1]);
      if (!hideLoggerDebug) {
        logger.debug(`File transfer stats have been ${showFileTransfer ? 'enabled' : 'disabled'}.`);
      }
    } else {
      logger.warn('Please specify a boolean for \'--file-transfer\'.');
      if (!hideLoggerDebug) {
        logger.debug('File transfer stats have been enabled');
      }
      showFileTransfer = true;
    }
  }
  if (k > -1) {
    if (!Number.isNaN(Number(process.argv[k + 1]))) {
      try {
        maxAttempts = Number(process.argv[k + 1]);
      } catch (e) {
        console.error(e);
      }
    } else {
      logger.error('Please specify a number for the \'--attempts\' argument.');
      process.exit(1);
    }
  }
  logger.info('Downloading icons..');
  return downloadIcons(showFileTransfer);
  // done();
});
*/

/**
 * Modifies the icons in order to work with Angular Material 2/5
 * @deprecated
 */
/*
gulp.task('modify-icons', () => {
  logger.info('Modifying the icons to use <svg>...');
  return gulp.src('src/assets/mdi.svg')
    .pipe(transform('utf8', transformIconFile))
    .pipe(gulp.dest('src/assets'));
});
*/

/**
 * @deprecated
 * @param content
 */
/*
function transformIconFile(content: string): string {
  // content = content.replace(SVG_PATTERN, (_match: string, head: string, id: string) =>
  //  `${head} id="${id}" width="24px" height="24px" viewBox="0 0 24 24"`
  // );
  content = replaceAll(content, '<g id="[A-Za-z][A-Za-z0-9]*"', '')
  content = replaceAll(content, '<g', '<svg');
  content = replaceAll(content, '</g>', '</svg>');
  return content;
}
*/

gulp.task('copy-icons', () => {
  return gulp.src('node_modules/@mdi/angular-material/mdi.svg')
    .pipe(gulp.dest('src/assets'));
});
/**
 * The default workflow to use MDI in the project
 */
gulp.task('default-icons', gulp.series('copy-icons', (done) => {
  logger.success('Tasks finished!');
  done();
  process.exit();
}));
/**
 * The workflow to use MDI in the project but assumes that the user has already downloaded `mdi.svg`
 * @deprecated
 */
/*
gulp.task('no-download-icons', gulp.series('modify-icons', (done) => {
  logger.success('Tasks finished!');
  done();
  process.exit();
}));
*/
