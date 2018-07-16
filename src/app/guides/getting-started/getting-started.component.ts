import { SharedService } from '../../shared.service';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-getting-started',
	templateUrl: './getting-started.component.html'
})
export class GettingStartedComponent implements OnInit {

	constructor(private shared: SharedService) { }

	ngOnInit() {
		this.shared.title = 'Getting Started';
	}

}
