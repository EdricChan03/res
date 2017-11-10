import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, AfterViewInit, ElementRef, ViewChild, Input, DoCheck } from '@angular/core';
import * as hljs from 'highlight.js';
@Component({
    selector: 'code-viewer',
    templateUrl: './code-viewer.component.html'
})

export class CodeViewerComponent implements AfterViewInit, DoCheck {
	@ViewChild('code') content: ElementRef;
	/**
	 * Sets the language of the code block
	 * @type {string}
	 */
	@Input() language: string;
	/**
	 * Sets the filename of the code block
	 * @type {string}
	 */
	@Input() fileName?: string;
    isDark: boolean;
    originalCode: string;
    constructor(private snackbar: MatSnackBar) { }
    copyToClipboard() {
        if (document.queryCommandSupported && document.queryCommandSupported('copy')) {
            let textarea = document.createElement("textarea");
            textarea.textContent = this.originalCode;
            textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in MS Edge.
            document.body.appendChild(textarea);
            textarea.select();
            try {
                return document.execCommand("copy");  // Security exception may be thrown by some browsers.
            } catch (e) {
                this.snackbar.open(`Error: ${e}`, null, {horizontalPosition: "start", duration: 6000, extraClasses: ['mat-elevation-z2']});
                return false;
            } finally {
                document.body.removeChild(textarea);
                this.snackbar.open('Code copied to clipboard', null, { duration: 5000, horizontalPosition: "start", extraClasses: ['mat-elevation-z2'] });
            }
        }
    }
    ngDoCheck() {
        if (window.localStorage.getItem('darkTheme')) {
            this.isDark = JSON.parse(window.localStorage.getItem('darkTheme'));
        } else {
            this.isDark = false;
        }
    }
    ngAfterViewInit() {
		// Checks if the file name input is stated
		if (this.fileName) {
			// Yes, the file input is stated
			hljs.highlightBlock(this.content.nativeElement.childNodes[6]);
			this.originalCode = this.content.nativeElement.childNodes[6].innerText;
		} else if (this.content.nativeElement.childNodes.length >= 6){
			// No, the file input is not stated or is invalid
			// console.log(this.content.nativeElement.childNodes);
			hljs.highlightBlock(this.content.nativeElement.childNodes[5]);
			this.originalCode = this.content.nativeElement.childNodes[5].innerText;
		} else {
			hljs.highlightBlock(this.content.nativeElement.childNodes[3]);
			this.originalCode = this.content.nativeElement.childNodes[3].innerText;
		}
    }
}