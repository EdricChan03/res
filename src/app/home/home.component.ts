import { SharedInjectable } from '../shared';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

	constructor(private shared: SharedInjectable) {
		this.shared.title = "Home";
	}

	ngOnInit() {
	}

}
