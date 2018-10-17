console.log('%cInitialising Blogger website...', 'color: orange; font-style: italic');
console.group('%cDevelopers', 'color: red');
console.log('Hey there developer! Welcome to my website!');
console.log('Are you a developer? Feel nerdy? Then contribute to stuff that I make!');
console.log('Check out some of my stuff:');
console.log('- StudyBuddy -> https://github.com/Chan4077/StudyBuddy');
console.log('- RSS Reader -> https://github.com/Chan4077/rss-reader');
console.log('- Chan4077.Github.io -> https://github.com/Chan4077/chan4077.github.io');
console.log('Thanks!');
console.log('%cExecute help() to see all functions available in this script.', 'color: blue; font-weight: bold');
console.groupEnd();
/*
Initialises highlight.js
*/
if (typeof hljs !== 'undefined') {
  hljs.initHighlightingOnLoad();
  // The configuration options for highlight.js
  hljs.configure({ useBR: true });
}
/*
Sets the window's MDC to be mdc
This also assumes that MDC exists.
*/
if (typeof mdc !== 'undefined') {
  window.mdc = mdc;
}
/**
 * Initialises Material Design Components
 */
function initMdc() {
  if (typeof window.mdc !== 'undefined') {
    window.mdc.autoInit();
  } else if (typeof mdc !== 'undefined') {
    mdc.autoInit();
  } else {
    throw new Error('MDC isn\'t imported! Either include MDC in the Window object or execute the auto initialization manually!');
  }
}
/**
 * Gets the current URL
 * @returns The current URL
 */
function currentUrl() {
  return window.location.href;
}
/**
 * Gets help for a specific method
 * @param {string} [methodName] The method to get help for
 * @returns The help for the method/everything
 */
function help(methodName) {
  if (typeof methodName !== 'undefined') {
    switch (methodName) {
      case 'currentUrl':
        console.log('Help for %ccurrentUrl', 'font-weight: bold');
        break;
      default:
        console.warn('Could not find help for ' + methodName);
    }
  } else {
    console.log('%cNote:%c Square brackets in usage statements indicate that the parameter is optional.', 'font-weight: bold', 'all: initial');
    console.group('%cAll Functions', 'color: red; font-size: large');
    console.groupCollapsed('%ccurrentUrl', 'color: blue; font-size: medium');
    console.log('%cDescription:%c Gets thte current URL and returns it as a string', 'font-weight: bold', 'all: initial');
    console.groupEnd();
    console.groupCollapsed('%chelp', 'color: blue; font-size: medium');
    console.log('%cDescription:%c Logs help to the console for a specific function or for all functions', 'font-weight: bold', 'all: initial');
    console.log('%cUsage:%c help([functionName])', 'font-weight: bold', 'all: initial');
    console.groupCollapsed('%cExamples', 'color: orange');
    console.log('help() - Log all functions and their descriptions (with optional examples)');
    console.log('help(\'currentUrl\') - Gives information about the `currentUrl` function');
    console.groupEnd();
    console.groupEnd();
    console.groupCollapsed('%cinitMdc', 'color: blue; font-size: medium');
    console.log('%cDescription:%c Initializes Material Design Components (MDC)', 'font-weight: bold', 'all: initial');
    console.groupEnd();
    console.groupCollapsed('%clog', 'color: blue; font-size: medium');
    console.log('%cDescription:%c Logs a message to the console', 'font-weight: bold', 'all: initial');
    console.log('%cUsage:%c log(message, [msgType])', 'font-weight: bold', 'all: initial');
    console.groupCollapsed('%cExamples', 'color: orange');
    console.log('log(\'Hello, World!\') - Outputs \'Hello, World!\' to the console')
    console.log('log() - Throws an error about a missing parameter')
    console.log('log(\'Never gonna give you up, never gonna get you down\', \'warn\') - Logs the message as a warning');
    console.groupEnd();
    console.groupEnd();
    console.groupEnd();
    console.log('%cPRO TIP!%c Enter %chelp(functionName)%c for more information about a function.', 'color: white; background-color: rgb(68, 132, 233)', 'all: initial', 'font-weight: bold', 'all: initial');
  }
}
/**
 * An utility method for logging something
 * @param {string} msg The message to log
 * @param {string} [logType] The type of log. If this isn't specified, it'll be defaulted to 'log'.
 */
function log(msg, logType) {
  if (msg) {
    if (logType) {
      switch (logType) {
        case 'debug':
          console.debug(msg);
          break;
        case 'error':
          console.error(msg);
          break;
        case 'log':
          console.log(msg);
          break;
        case 'warn':
          console.warn(msg);
          break;
        default:
          console.warn('Warning: \'' + logType + '\' is not supported! (Using console.log instead)');
          console.log(msg);
          break;
      }
    } else {
      console.log(msg);
    }
  } else {
    throw new Error('Please specify a message to log to the console!');
  }
}
console.log('%cDone initialising.', 'color: green')
// Auto initialises MDC components
initMdc();
