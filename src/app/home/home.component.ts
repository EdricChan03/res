import { Shared } from './../shared';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

	constructor(private shared: Shared) {
		this.shared._title = "Home";
	}

	ngOnInit() {
	}

}
