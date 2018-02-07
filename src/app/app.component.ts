import { SharedInjectable } from './shared';
import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
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
export class AppComponent {
	constructor(private shared: SharedInjectable) {
	}
	@ViewChild('sidenav') sidenav: MatSidenav;
	get isMobile() {
		if (this.shared.isMobile()) {
			return true;
		} else {
			return false;
		}
	}
	get isSidenavOpened() {
		if (this.sidenav.opened) {
			return true;
		} else {
			return false;
		}
	}
	isScrolled(): boolean {
		if (document.getElementById('sidenav-content').scrollTop > 20) {
			return true;
		} else {
			return false;
		}
	}
	getTitle() {
		return this.shared.title;
	}
	scrollToTop() {
		document.getElementById('top').scrollIntoView({
			behavior: 'smooth'
		});
	}
}
