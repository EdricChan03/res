import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-about',
	templateUrl: './about.component.html',
})
export class AboutComponent implements OnInit {

	constructor(
		private shared: SharedService,
		private http: HttpClient
	) { }
	typescriptLicense: Observable<string>;
	mdiLicense: Observable<string>;
	projectLicense: Observable<string>;
	angularLicense: Observable<string>;
	matLicense: Observable<string>;
	gitFirstPart = 'https://raw.githubusercontent.com';
	get isMobile() {
		return this.shared.isMobile();
	}
	/**
	 * Retrieves a license for the specified repository
	 * @param username The repository's owner
	 * @param project The name of the repository
	 * @param licenseFilePath The file path of the license file
	 */
	getLicense(username: string, project: string, licenseFilePath: string = 'LICENSE'): Observable<string> {
		return this.http.get(`${this.gitFirstPart}/${username}/${project}/master/${licenseFilePath}`, { responseType: 'text' });
	}
	ngOnInit() {
		this.shared.title = 'About';
		this.typescriptLicense = this.getLicense('Microsoft', 'TypeScript', 'LICENSE.txt');
		this.mdiLicense = this.getLicense('Templarian', 'MaterialDesign');
		this.projectLicense = this.getLicense('Chan4077', 'res');
		this.angularLicense = this.getLicense('angular', 'angular');
		this.matLicense = this.getLicense('angular', 'material2');
	}

}
