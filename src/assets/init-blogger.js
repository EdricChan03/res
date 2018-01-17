console.log('Initialising Blogger website...');
// Initialises highlight.js
hljs.initHighlightingOnLoad();
// The configuration options for highlight.js
hljs.configure({useBR: true});
window.mdc = mdc;
// Auto initialises MDC components
window.mdc.autoInit();