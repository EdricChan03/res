import * as chalk from 'chalk';

export declare type LogType = 'debug' | 'error' | 'info' | 'log' | 'warn';
export declare type BoldType = 'all' | 'none' | 'prefix';

export class Logger {
  console: Console | any;
  constructor(loggerConsole?: Console) {
    if (loggerConsole) {
      this.console = loggerConsole;
    } else {
      this.console = console;
    }
  }
  /**
   * Bold handler
   * @param bold The type of bold
   * @param prefix The prefix of the statement
   * @param statement The statement itself
   * @private
   */
  private _boldHandler(bold: BoldType, prefix: string, statement: any): { prefix: string, statement: any } {
    let _prefix, _statement = '';
    switch (bold) {
      case 'all':
        _prefix = `${chalk.default.bold(prefix)}`;
        _statement = `${chalk.default.bold(statement)}`;
        break;
      case 'prefix':
        _prefix = `${chalk.default.bold(prefix)}`;
        _statement = statement;
        break;
      case 'none':
        _prefix = prefix;
        _statement = statement;
        break;
    }
    return { prefix: _prefix, statement: _statement };
  }
  /**
   * Logs a statement to the console
   */
  log(statement: any) {
    this.console.log(statement);
  }
  /**
   * Logs debug info to the console. This can be seen by the prepended `DEBUG` prefix attached to the statement.
   * @param statement The statement to print
   * @param hasColors Whether to show colors/colours
   * @param bold Text to be made bold. ('all' is to bold all of the text,
   * 'prefix' for only what the log statement means and 'none' for no bolding at all)
   */
  debug(statement: any, hasColors: boolean = true, bold: BoldType = 'prefix') {
    const _boldResult = this._boldHandler(bold, 'DEBUG:', statement);
    if (hasColors) {
      // tslint:disable-next-line:no-console
      this.console.debug(chalk.default.cyan(`${_boldResult.prefix} ${_boldResult.statement}`));
    } else {
      // tslint:disable-next-line:no-console
      this.console.debug(`DEBUG: ${statement}`);
    }
  }
  /**
   * Logs information to the console. This can be seen by the prepended `INFO` prefix attached to the statement.
   * @param statement The statement to print
   * @param hasColors Whether to show colors/colours
   * @param bold Text to be made bold. ('all' is to bold all of the text,
   * 'prefix' for only what the log statement means and 'none' for no bolding at all)
   */
  info(statement: any, hasColors: boolean = true, bold: BoldType = 'prefix') {
    const _boldResult = this._boldHandler(bold, 'INFO:', statement);
    if (hasColors) {
      // tslint:disable-next-line:no-console
      this.console.info(chalk.default.blueBright(`${_boldResult.prefix} ${_boldResult.statement}`));
    } else {
      // tslint:disable-next-line:no-console
      this.console.info(`INFO: ${statement}`);
    }
  }
  /**
   * Logs warnings to the console. This can be seen by the prepended `WARN` prefix attached to the statement.
   * @param statement The statement to print
   * @param hasColors Whether to show colors/colours
   * @param bold Text to be made bold. ('all' is to bold all of the text,
   * 'prefix' for only what the log statement means and 'none' for no bolding at all)
   */
  warn(statement: any, hasColors: boolean = true, bold: BoldType = 'prefix') {
    const _boldResult = this._boldHandler(bold, 'WARN:', statement);
    if (hasColors) {
      // tslint:disable-next-line:no-console
      this.console.warn(chalk.default.yellow(`${_boldResult.prefix} ${_boldResult.statement}`));
    } else {
      // tslint:disable-next-line:no-console
      this.console.warn(`WARN: ${statement}`);
    }
  }
  /**
   * Logs errors to the console. This can be seen by the prepended `ERROR` prefix attached to the statement.
   * @param statement The statement to print
   * @param hasColors Whether to show colors/colours
   * @param bold Text to be made bold. ('all' is to bold all of the text,
   * 'prefix' for only what the log statement means and 'none' for no bolding at all)
   */
  error(statement: any, hasColors: boolean = true, bold: BoldType = 'prefix') {
    const _boldResult = this._boldHandler(bold, 'ERROR:', statement);
    if (hasColors) {
      // tslint:disable-next-line:no-console
      this.console.error(chalk.default.redBright(`${_boldResult.prefix} ${_boldResult.statement}`));
    } else {
      // tslint:disable-next-line:no-console
      this.console.error(`ERROR: ${statement}`);
    }
  }
  /**
   * Logs success statements to the console.
   * @param statement The statement to print
   */
  success(statement: any) {
    const _statement = chalk.default.green(statement);
    this.log(_statement);
  }
}
