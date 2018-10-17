import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-keyboard-shortcut-dialog',
  templateUrl: './keyboard-shortcut-dialog.component.html',
  styles: [`
  .keyboard-shortcut-dialog-table {
    margin-left: -24px;
    margin-right: -24px;
  }
  `]
})
export class KeyboardShortcutDialogComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
