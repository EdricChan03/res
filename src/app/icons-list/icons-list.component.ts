import { Shared } from './../shared';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { trigger, style, animate, transition } from '@angular/animations';
import { CodeSnippetComponent } from '../code-snippet/code-snippet.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
	selector: 'app-icons-list',
	templateUrl: './icons-list.component.html',
	animations: [
		trigger(
			'enterAnimation', [
				transition(':enter', [
					style({ transform: 'scale(0)', opacity: 0 }),
					animate('0.2s ease-in-out', style({ transform: 'scale(1)', opacity: 1 }))
				]),
				transition(':leave', [
					style({ transform: 'scale(1)', opacity: 1 }),
					animate('0.2s ease-in-out', style({ transform: 'scale(0)', opacity: 0 }))
				])
			]
		)
	]
})
export class IconsListComponent implements OnInit {
	icons: Icon[];
	filteredIcons: Icon[];
	selectedIcon: string;
	searchField: string;
	category: "name" | "tag" | "alias" | "contributor";
	categories: string[];
	multipleCategories: boolean;
	iconSelected: boolean;
	showSearch: boolean = false;
	constructor(private http: HttpClient, private snackbar: MatSnackBar, private shared: Shared, private dialog: MatDialog) { }
	get isMobile() {
		return this.shared.isMobile();
	}
	hasScrolled(): boolean {
		if (document.getElementById('sidenav-content').scrollTop > 20) {
			return true;
		} else {
			return false;
		}
	}
	ngOnInit() {
		this.shared._title = "Home";
		this.http.get<Icon[]>("https://materialdesignicons.com/cdn/2.0.46/meta.json", { responseType: "json" }).subscribe(result => {
			this.icons = result;
		}, (error: Error) => {
			let snackBarRef = this.snackbar.open(`Error: ${error.message}`, "Send Feedback", { duration: 8000, horizontalPosition: "start", extraClasses: ['mat-elevation-z2'] });
			snackBarRef.onAction().subscribe(() => {
				let dialogRef = this.shared.sendFeedbackWithRef(error.message);
				dialogRef.afterClosed().subscribe(result => {
					if (result) {
						if (result == 'cancel') {
							// Catch cancel click
						} else {
							// Submit feedback
							this.shared.openSnackBar({ msg: "Your feedback has been sent!", additionalOpts: { duration: 6000, horizontalPosition: "start", extraClasses: ['mat-elevation-z2'] } });
						}
					}
				})
			})
		});
	}
	search() {
		if (this.category) {
			// User selected a category
			if (this.category == 'contributor') {
				this.filteredIcons = this.icons.filter((icon) => {
					if (icon.contributor.indexOf(this.searchField.toLowerCase()) > -1) {
						return true;
					} else {
						return false;
					}
				})
			} else if (this.category == 'tag') {
				this.filteredIcons = this.icons.filter((icon) => {
					icon.tags.filter((tag) => {
						if (tag.indexOf(this.searchField.toLowerCase()) > -1) {
							return true;
						} else {
							return false;
						}
					})
				})
			} else if (this.category == 'alias') {
				this.filteredIcons = this.icons.filter((icon) => {
					icon.aliases.filter((alias) => {
						if (alias.indexOf(this.searchField.toLowerCase()) > -1) {
							return true;
						} else {
							return false;
						}
					})
				})
			} else {
				this.filteredIcons = this.icons.filter((icon) => {
					if (icon.name.indexOf(this.searchField.toLowerCase()) > -1) {
						return true;
					} else {
						return false;
					}
				})
			}
		} else {
			// User did not select any category
			this.filteredIcons = this.icons.filter((icon) => {
				if (icon.name.indexOf(this.searchField.toLowerCase()) > -1) {
					return true;
				} else if (icon.tags) {
					icon.tags.filter((tag) => {
						if (tag.indexOf(this.searchField.toLowerCase()) > -1) {
							return true;
						}
					})
				} else if (icon.aliases) {
					icon.aliases.filter((alias) => {
						if (alias.indexOf(this.searchField.toLowerCase()) > -1) {
							return true;
						}
					})
				} else {
					return false;
				}
			})
		}
	}
	selected(name: string) {
		if (this.selectedIcon == name) {
			this.selectedIcon = null;
			this.iconSelected = false;
		} else {
			this.selectedIcon = name;
			if (this.iconSelected) {
				this.iconSelected = false;
			}
			setTimeout(() => {
				this.iconSelected = true;
			}, 50);
		}
	}

	showCodeSnippet() {
		let dialogRef = this.dialog.open(CodeSnippetComponent);
		dialogRef.componentInstance.selectedIcon = this.selectedIcon;
	}
}
interface Icon {
	name: string;
	aliases: string[];
	tags: string[];
	contributor: string;
}