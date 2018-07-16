import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Icon } from '../../interfaces';
import { HttpClient } from '@angular/common/http';

@Component({
	selector: 'app-icon-info-dialog',
	templateUrl: './icon-info-dialog.component.html',
})
export class IconInfoDialogComponent implements OnInit {

	iconInfo = {};
	constructor(@Inject(MAT_DIALOG_DATA) public iconData: Icon, private http: HttpClient) { }
	iconInfoApi = 'http://dev.materialdesignicons.com/api/icon/';
	ngOnInit() {
		this.http.get(this.iconInfoApi + this.iconData.id, { headers: { 'Access-Control-Allow-Origin': '*' } }).subscribe(result => {
			this.iconInfo = result;
		});
		console.log(this.iconInfo);
	}

}
