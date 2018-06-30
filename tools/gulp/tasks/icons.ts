import { task, src } from 'gulp';
import { File } from 'gulp-util';
import * as chalk from 'chalk';
import * as request from 'request';
import * as fs from 'fs';
import * as readline from 'readline';

const progress = require('request-progress');
const transform = require('gulp-transform');
const prettysize = require('prettysize');

//#region Patterns
const SVG_PATTERN = /(<svg[^>]*) id="([^"]*)"/g;
//#endregion

/**
 * The default workflow to use MDI in the project
 */
task('default-icons', ['download-icons', 'modify-icons']);
/**
 * The workflow to use MDI in the project but assumes that the user has already downloaded `mdi.svg`
 */
task('no-download-icons', ['modify-icons']);
/**
 * Downloads icons from {@link https://materialdesignicons.com}
 * Parameter `--show-file-storage`: Shows the file storage (not working)
 * Parameter `--show-file-transfer`: Show the current file transfer stats
 * Parameter `--verbose`: Enables verbose logging
 */
task('download-icons', () => {
	// tslint:disable-next-line:max-line-length
	let showFileStorage: boolean, showFileTransfer: boolean, verboseLogging: boolean, i = process.argv.indexOf('--show-file-storage'), j = process.argv.indexOf('--show-file-transfer'), k = process.argv.indexOf('--verbose');
	if (i > -1) {
		console.log(chalk.default.yellow('Enabled file storage stats.'));
		console.log(chalk.default.redBright('✘ EXPERIMENTAL: This flag is currently not working of the moment. Aborting...'));
		showFileStorage = true;
		process.exit(0);
	}
	if (j > -1) {
		console.log(chalk.default.yellow('Enabled file transfer stats.'));
		showFileTransfer = true;
	}
	if (k > -1) {
		console.log(chalk.default.yellow('Enabled verbose logging (which will prevent the progress bar from disappearing)'));
		console.log(chalk.default.yellow('⚠ WARNING: Enabling this flag will make the progress bar a bit buggy. Take care with caution!'));
		verboseLogging = true;
	}
	console.log(chalk.default.yellow('\nDownloading icons...\n'));
	return progress(request('https://materialdesignicons.com/api/download/angularmaterial/38EF63D0-4744-11E4-B3CF-842B2B6CFE1B'))
		.on('progress', (state: { percent: number, size: {total: number, transferred: number} }) => {
			// tslint:disable-next-line:max-line-length
			const progress = ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#'];
			progress.length = Math.ceil(state.percent * 25);
			if (showFileTransfer) {
				// tslint:disable-next-line:max-line-length
				process.stdout.write(chalk.default.greenBright(`${progress.join('')} | ${Math.ceil(state.percent * 100)}% | ${prettysize(state.size.transferred)}/${prettysize(state.size.total)} transferred`));
				if (!verboseLogging) {
					readline.cursorTo(process.stdout, 0);
				}
			} else {
				process.stdout.write(chalk.default.greenBright(`${progress.join('')} | ${Math.ceil(state.percent * 100)}%`));
				if (!verboseLogging) {
					readline.cursorTo(process.stdout, 0);
				}
			}
		})
		.on('error', (err: string) => {
			console.log(chalk.default.bgBlack.redBright(`Error: ${err}`));
		})
		.on('end', () => {
			readline.clearLine(process.stdout, 0);
			console.log(chalk.default.green('Done downloading! Saved to src/assets/mdi.svg'));
		})
		.pipe(fs.createWriteStream('src/assets/mdi.svg'));
});
/**
 * Modifies the icons in order to work with Angular Material 2/5
 */
task('modify-icons', () => {
	console.log(chalk.default.yellow('\nModifying the icons to use <svg>...\n'));
	return src('src/assets/mdi.svg')
		.pipe(transform('utf8', transformIconFile));
});

function transformIconFile(content: string): Buffer | string {
	content = content.replace('<g', '<svg');
	content = content.replace(SVG_PATTERN, (_match: string, head: string, id: string) =>
		`${head} id="${id}" width="24px" height="24px" viewBox="0 0 24 24"`
	);
	content = content.replace('</g>', '</svg>');
	return content;
}
