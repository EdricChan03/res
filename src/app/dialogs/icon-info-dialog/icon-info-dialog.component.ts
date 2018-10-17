import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Icon } from '../../interfaces';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-icon-info-dialog',
  templateUrl: './icon-info-dialog.component.html',
})
export class IconInfoDialogComponent implements OnInit {

  iconInfo = {};
  errorMsg: string;
  constructor(
    @Inject(MAT_DIALOG_DATA) public iconData: Icon,
    private http: HttpClient,
    private shared: SharedService
  ) { }
  ngOnInit() {
    this.http.get(this.shared.mdiIconApi + this.iconData.id).subscribe(result => {
      this.iconInfo = result;
    }, (error) => {
      this.errorMsg = error;
    });
    console.log(this.iconInfo);
  }

}
