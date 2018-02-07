console.log("%cInitialising Blogger website...", "color: black; background-color: yellow");
console.group("Developers");
console.log("%cHey there developer! Welcome to my website!", "color: black; background-color: yellow");
console.log("%cDo you like looking at Inspector/ DevTools? Are you a developer? Then contribute to\n stuff that I make!", "color: black; background-color: yellow");
console.log("%cCheck out some of my stuff:\n- StudyBuddy -> https://github.com/Chan4077/StudyBuddy\n- RSS Reader -> https://github.com/Chan4077/rss-reader\n- Chan4077.Github.io -> https://github.com/Chan4077/chan4077.github.io", "color: black; background-color: yellow");
console.log("Thanks!");
console.log("Execute help() to see a list of functions available.");
console.groupEnd();
// Initialises highlight.js
hljs.initHighlightingOnLoad();
// The configuration options for highlight.js
hljs.configure({useBR: true});
window.mdc = mdc;
// Auto initialises MDC components
window.mdc.autoInit();

function initMdc() {
	window.mdc.autoInit();
}
function currentUrl() {
	return window.location.href;
}
function help(methodName) {
	methodName = methodName || "all";
	if (methodName == "all") {
		console.log("%cFunctions:\n- initMdc(): Initializes MDC components\n- help(): Outputs help\n- currentUrl(): Gets the current url and returns it", "color: black; background-color: yellow")
	} else {

	}
}

console.log("%c Done initialising.", "color: black, background-color: green")