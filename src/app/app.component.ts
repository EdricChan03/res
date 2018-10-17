import { SharedService } from './shared.service';
import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { trigger, style, animate, transition } from '@angular/animations';
import { A, D, G, H, I, L, SHIFT, SLASH } from '@angular/cdk/keycodes';
import { MatDialog } from '@angular/material/dialog';
import { KeyboardShortcutDialogComponent } from './dialogs/keyboard-shortcut-dialog/keyboard-shortcut-dialog.component';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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
  // See https://stackoverflow.com/a/12444641 for more info
  keyMaps = {};
  constructor(
    private shared: SharedService,
    private dialog: MatDialog,
    private router: Router,
    private http: HttpClient
  ) {
    shared.keyDownUpEvents$.subscribe(e => {
      console.log(`Type: ${e.type}`);
      this.keyMaps[e.keyCode] = e.type === 'keydown';
      if (e.srcElement.nodeName !== 'INPUT') {
        this.keyboardShortcutHandler(e);
      }
    });
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
  keyboardShortcutHandler(e: KeyboardEvent) {
    console.log(e);
    if (this.keyMaps[SHIFT] && this.keyMaps[SLASH]) {
      this.openKeyboardShortcutDialog();
    } else if (this.keyMaps[G]) {
      if (this.keyMaps[A]) {
        this.router.navigateByUrl('/about');
      } else if (this.keyMaps[H]) {
        this.router.navigateByUrl('/home');
      } else if (this.keyMaps[L]) {
        this.router.navigateByUrl('/icons-list');
      }
    } else if (this.keyMaps[D]) {
      if (this.keyMaps[I]) {
        const filename = 'mdi.svg';
        this.http.get('assets/mdi.svg', { responseType: 'text' }).subscribe(result => {
          const data = result;
          const blob = new Blob([data], { type: 'image/svg+xml' });
          if (window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveBlob(blob, filename);
          } else {
            const elem = window.document.createElement('a');
            elem.href = window.URL.createObjectURL(blob);
            elem.download = filename;
            document.body.appendChild(elem);
            elem.click();
            document.body.removeChild(elem);
          }
        });
      }
    }
    window['keyMaps'] = this.keyMaps;
  }
  isScrolled(): boolean {
    if (document.getElementById('sidenav-content').scrollTop > 20) {
      return true;
    } else {
      return false;
    }
  }
  openKeyboardShortcutDialog() {
    if (this.dialog.getDialogById('keyboard-shortcut-dialog') === undefined) {
      console.log('Opening keyboard shortcuts...');
      this.dialog.open(KeyboardShortcutDialogComponent, { id: 'keyboard-shortcut-dialog' });
    } else {
      console.log('Closing keyboard shortcuts...');
      this.dialog.getDialogById('keyboard-shortcut-dialog').close();
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
