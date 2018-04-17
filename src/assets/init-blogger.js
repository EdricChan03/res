console.log("%cInitialising Blogger website...", "color: black; background-color: yellow");
console.group("Developers");
console.log("%cHey there developer! Welcome to my website!", "color: black; background-color: yellow");
console.log("%cDo you like looking at Inspector/ DevTools? Are you a developer? Then contribute to\n stuff that I make!", "color: black; background-color: yellow");
console.log("%cCheck out some of my stuff:\n- StudyBuddy -> https://github.com/Chan4077/StudyBuddy\n- RSS Reader -> https://github.com/Chan4077/rss-reader\n- Chan4077.Github.io -> https://github.com/Chan4077/chan4077.github.io", "color: black; background-color: yellow");
console.log("Thanks!");
console.log("Execute help() to see a list of functions available.");
console.groupEnd();
/*
Initialises highlight.js
Note: This doesn't check if Highlight.js has been loaded on the page. This is up to the dev.
*/
hljs.initHighlightingOnLoad();
// The configuration options for highlight.js
hljs.configure({useBR: true});
/*
Sets the window's MDC to be mdc
This also assumes that MDC exists.
*/
window.mdc = mdc;
/**
 * Initialises Material Design Components
 */
function initMdc() {
	window.mdc.autoInit();
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
	if (!methodName) {
		
	}
	methodName = methodName || "all";
	if (methodName == "all") {
		console.log("%cFunctions:\n- initMdc(): Initializes MDC components\n- help(): Outputs help for a specific method or every command\n- currentUrl(): Gets the current url and returns the URL as a string", "color: black; background-color: yellow")
	} else {
		
	}
}
/**
 * An utility method for logging something
 * @param {string} msg The message to log
 * @param {string} [logType] The type of log. If this isn't specified, it'll be defaulted to "log".
 */
function log(msg, logType) {
	if (msg) {

	} else {
		throw new Err('');
	}
}
console.log("%cDone initialising.", "color: black, background-color: green")
// Auto initialises MDC components
initMdc();