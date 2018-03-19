import { Component, OnInit } from '@angular/core';
import { SharedInjectable } from '../shared.service';
import { HttpClient } from '@angular/common/http';

@Component({
	selector: 'app-about',
	templateUrl: './about.component.html',
})
export class AboutComponent implements OnInit {

	constructor(
		private shared: SharedInjectable,
		private http: HttpClient
	) { }
	typescriptLicense: string;
	mdiLicense: string;
	projectLicense: string;
	angularLicense: string;
	matLicense: string;
	gitFirstPart = 'https://raw.githubusercontent.com';
	get isMobile() {
		return this.shared.isMobile();
	}
	getLicense(username: string, project: string, licenseFilePath: string = 'LICENSE'): string {
		let httpResult: string;
		this.http.get(`${this.gitFirstPart}/${username}/${project}/master/${licenseFilePath}`, { responseType: 'text' })
			.subscribe(result => {
				httpResult = result;
			});
		return httpResult;
	}
	ngOnInit() {
		this.typescriptLicense = this.getLicense('Microsoft', 'TypeScript');
		this.mdiLicense = this.getLicense('Templarian', 'MaterialDesign', 'license.txt');
		this.projectLicense = this.getLicense('Chan4077', 'res');
		this.angularLicense = this.getLicense('angular', 'angular');
		this.matLicense = this.getLicense('angular', 'material2');
	}

}
