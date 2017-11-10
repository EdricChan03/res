import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
	selector: 'app-code-snippet',
	templateUrl: './code-snippet.component.html'
})
export class CodeSnippetComponent {
	constructor(private dialogRef: MatDialogRef<CodeSnippetComponent>){}
	selectedIcon: string;
	close() {
		this.dialogRef.close();
	}
}
