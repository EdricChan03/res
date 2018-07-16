import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, AfterViewInit, ElementRef, ViewChild, Input, DoCheck } from '@angular/core';
import * as hljs from 'highlight.js';

@Component({
	selector: 'code-viewer',
	templateUrl: './code-viewer.component.html'
})

export class CodeViewerComponent implements AfterViewInit, DoCheck {
	@ViewChild('code') content: ElementRef<HTMLElement>;
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
			const textarea = document.createElement('textarea');
			textarea.textContent = this.originalCode;
			textarea.style.position = 'fixed'; // Prevent scrolling to bottom of page in MS Edge.
			document.body.appendChild(textarea);
			textarea.select();
			try {
				return document.execCommand('copy'); // Security exception may be thrown by some browsers.
			} catch (e) {
				this.snackbar.open(`Error: ${e}`, null, { horizontalPosition: 'start', duration: 6000, panelClass: 'mat-elevation-z2' });
				return false;
			} finally {
				document.body.removeChild(textarea);
				this.snackbar.open('Code copied to clipboard', null, { duration: 5000, horizontalPosition: 'start', panelClass: ['mat-elevation-z2'] });
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
			hljs.highlightBlock(this.content.nativeElement.childNodes[3].childNodes[0]);
			this.originalCode = this.content.nativeElement.childNodes[3].childNodes[0].textContent;
		} else {
			hljs.highlightBlock(this.content.nativeElement.childNodes[2].childNodes[0]);
			this.originalCode = this.content.nativeElement.childNodes[2].childNodes[0].textContent;
		}
	}
}
