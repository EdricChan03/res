import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { Injectable, Component, OnInit, ViewChild, NgModule } from '@angular/core';
import { MatSnackBarConfig, MatSnackBar, MatSnackBarRef, SimpleSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { MatSelectionList, MatListModule } from '@angular/material/list';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ComponentType } from '@angular/cdk/portal';
import { Title, SafeHtml } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { MatCommonModule } from '@angular/material/core';
import { Observable, Subject } from 'rxjs';


@Injectable()
export class SharedService {
  private _title = '';
  readonly mdiContributorsApi = 'https://materialdesignicons.com/api/contributors/38EF63D0-4744-11E4-B3CF-842B2B6CFE1B';
  readonly mdiIconApi = 'https://materialdesignicons.com/api/icon/';
  readonly mdiIconVersion = '3.3.92';
  readonly mdiIconListApi = `https://materialdesignicons.com/cdn/${this.mdiIconVersion}/meta.json`;
  /**
   * Keydown events to the page
   */
  keydownEvents = new Subject<KeyboardEvent>();
  /**
   * Keydown events as an observable
   */
  keydownEvents$ = this.keydownEvents.asObservable();
  /**
   * Keyup events to the page
   */
  keyupEvents = new Subject<KeyboardEvent>();
  /**
   * Keyup events as an observable
   */
  keyupEvents$ = this.keyupEvents.asObservable();
  /**
   * Keypress events to the page
   */
  keypressEvents = new Subject<KeyboardEvent>();
  /**
   * Keypress events as an observable
   */
  keypressEvents$ = this.keypressEvents.asObservable();
  /**
   * Key events to the page
   */
  keyEvents = new Subject<KeyboardEvent>();
  /**
   * Key events as an observable
   */
  keyEvents$ = this.keyEvents.asObservable();
  /**
   * Keydown & keyup events to the page
   */
  keyDownUpEvents = new Subject<KeyboardEvent>();
  /**
   * Keydown & keyup events as an observable
   */
  keyDownUpEvents$ = this.keyDownUpEvents.asObservable();
  constructor(
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private documentTitle: Title,
    private breakpointObserver: BreakpointObserver
  ) {
    window.addEventListener('keydown', (event) => {
      this.keydownEvents.next(event);
      this.keyEvents.next(event);
      this.keyDownUpEvents.next(event);
    });
    window.addEventListener('keyup', (event) => {
      this.keyupEvents.next(event);
      this.keyEvents.next(event);
      this.keyDownUpEvents.next(event);
    });
    window.addEventListener('keypress', (event) => {
      this.keypressEvents.next(event);
      this.keyEvents.next(event);
    });
  }
  /**
   * Sends feedback
   * @param feedback The initial value for the feedback
   * @returns The dialog ref of the dialog
   * @deprecated
   */
  sendFeedbackWithRef(feedback?: string): MatDialogRef<PromptDialog> {
    // tslint:disable-next-line:max-line-length
    const tempData: PromptDialogConfig = { title: 'Send Feedback', msg: 'What\'s the issue? Please report it in the textbox below:', placeholder: 'Feedback', textarea: true, ok: 'Send Feedback' };
    if (feedback) {
      tempData.value = feedback;
    }
    return this.openPromptDialog(tempData);
  }
  /**
   * Sends feedback but handles it in the service
   * @param {string} feedback The initial value for the feedback
   * @param {'twitter'|'facebook'|'github'} handleVia The way to handle the feedback
   * @note If the param `handleVia` is specified, it assumes that the user has an account for these
   * @todo Use Twitter/ Facebook API. Github can just use following url: https://github.com/<author>/<repo>/issues/new
   * @todo Add handling for when no external social media provider is specified
   * @todo Make this fully work, currently setting to `private` at the moment
   * @private
   * @deprecated
   */
  private sendFeedback(feedback?: string, handleVia?: 'twitter' | 'facebook' | 'github') {
    // tslint:disable-next-line:max-line-length
    const tempData: PromptDialogConfig = { title: 'Send Feedback', msg: 'What\'s the issue? Please report it in the textbox below:', placeholder: 'Feedback', textarea: true, ok: 'Send Feedback' };
    const dialogRef = this.openPromptDialog(tempData);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result === 'cancel') {
          // User cancelled
        } else {
          if (handleVia) {
            if (handleVia === 'twitter') {
              // Twitter
            } else if (handleVia === 'facebook') {
              // Facebook
            } else {
              /*
              Github.
              Assumes that user has a github account.
              */
            }
          } else {
            // TODO
          }
        }
      }
    });
  }
  /**
   * Whether the current device is mobile
   */
  isMobile(): boolean {
    if (this.breakpointObserver.isMatched('(max-width: 699px)')) {
      return true;
    } else {
      return false;
    }
  }
  /**
   * Opens a snackbar with the specified params and no return
   * @param opts The options of the snackBar
   */
  openSnackBar(opts: SnackBarConfig): MatSnackBarRef<SimpleSnackBar> {
    return this.handleSnackBar(opts);
  }
  /**
   * Opens a component in a snackbar
   * @param opts The options of the snackbar
   * @returns The snackbar ref of the snackbar component
   */
  openSnackBarComponent(opts: SnackBarConfig): MatSnackBarRef<any> {
    return this.handleSnackBarWithComponent(opts);
  }
  /**
   * Handling of the snackbar
   * @param opts The snackbar config
   * @returns The snackbar's ref
   * @private
   */
  private handleSnackBar(opts: SnackBarConfig): MatSnackBarRef<SimpleSnackBar> {
    if (opts) {
      if (opts.action) {
        return this.snackBar.open(opts.msg, opts.action, opts.additionalOpts);
      } else {
        return this.snackBar.open(opts.msg, undefined, opts.additionalOpts);
      }
    } else {
      this.throwError('opts', 'SnackBarConfig');
    }
  }
  /**
   * Handles a snackbar with a component
   * @param opts The config for the snackBar
   * @retrns The snackbar's ref
   */
  private handleSnackBarWithComponent(opts: SnackBarConfig): MatSnackBarRef<any> {
    if (opts) {
      if (opts.additionalOpts) {
        if (opts.additionalOpts) {
          return this.snackBar.openFromComponent(opts.component, opts.additionalOpts);
        } else {
          return this.snackBar.openFromComponent(opts.component);
        }
      } else {
        this.throwError('opts.additionalOpts', 'MatSnackBarConfig');
      }
    } else {
      this.throwError('opts', 'SnackBarConfig');
    }
  }
  /**
   * Closes the current snackbar
   */
  closeSnackBar() {
    this.snackBar.dismiss();
  }
  /**
   * Opens an alert dialog with the specified parameters
   * @param opts The options for the dialog
   * @returns A reference of the alert dialog
   */
  openAlertDialog(opts: AlertDialogConfig): MatDialogRef<AlertDialog> {
    if (opts) {
      if (opts.panelClass) {
        if (opts.backdropClass) {
          const dialogRef = this.dialog.open(AlertDialog, { panelClass: opts.panelClass, backdropClass: opts.backdropClass });
          dialogRef.componentInstance.alertConfig = opts;
          return dialogRef;
        } else {
          const dialogRef = this.dialog.open(AlertDialog, { panelClass: opts.panelClass });
          dialogRef.componentInstance.alertConfig = opts;
          return dialogRef;
        }
      } else if (opts.backdropClass) {
        const dialogRef = this.dialog.open(AlertDialog, { backdropClass: opts.backdropClass });
        dialogRef.componentInstance.alertConfig = opts;
        return dialogRef;
      } else {
        const dialogRef = this.dialog.open(AlertDialog);
        dialogRef.componentInstance.alertConfig = opts;
        return dialogRef;
      }
    } else {
      this.throwError('opts', 'AlertDialogConfig');
    }
  }
  /**
   * Opens a confirm dialog with the specified parameters
   * @param opts The options for the dialog
   * @returns A reference of the confirm dialog
   */
  openConfirmDialog(opts: ConfirmDialogConfig): MatDialogRef<ConfirmDialog> {
    if (opts) {
      if (opts.panelClass) {
        if (opts.backdropClass) {
          const dialogRef = this.dialog.open(ConfirmDialog, { panelClass: opts.panelClass, backdropClass: opts.backdropClass });
          dialogRef.componentInstance.confirmConfig = opts;
          return dialogRef;
        } else {
          const dialogRef = this.dialog.open(ConfirmDialog, { panelClass: opts.panelClass });
          dialogRef.componentInstance.confirmConfig = opts;
          return dialogRef;
        }
      } else if (opts.backdropClass) {
        const dialogRef = this.dialog.open(ConfirmDialog, { backdropClass: opts.backdropClass });
        dialogRef.componentInstance.confirmConfig = opts;
        return dialogRef;
      } else {
        const dialogRef = this.dialog.open(ConfirmDialog);
        dialogRef.componentInstance.confirmConfig = opts;
        return dialogRef;
      }
    } else {
      this.throwError('opts', 'ConfirmDialogConfig');
    }
  }
  /**
   * Opens a prompt dialog with the specified parameters
   * @param opts The options for the dialog
   * @returns A reference of the prompt dialog
   */
  openPromptDialog(opts: PromptDialogConfig): MatDialogRef<PromptDialog> {
    if (opts) {
      if (opts.panelClass) {
        if (opts.backdropClass) {
          const dialogRef = this.dialog.open(PromptDialog, { panelClass: opts.panelClass, backdropClass: opts.backdropClass });
          dialogRef.componentInstance.promptConfig = opts;
          return dialogRef;
        } else {
          const dialogRef = this.dialog.open(PromptDialog, { panelClass: opts.panelClass });
          dialogRef.componentInstance.promptConfig = opts;
          return dialogRef;
        }
      } else if (opts.backdropClass) {
        const dialogRef = this.dialog.open(PromptDialog, { backdropClass: opts.backdropClass });
        dialogRef.componentInstance.promptConfig = opts;
        return dialogRef;
      } else {
        const dialogRef = this.dialog.open(PromptDialog);
        dialogRef.componentInstance.promptConfig = opts;
        return dialogRef;

      }
    } else {
      this.throwError('opts', 'PromptDialogConfig');
    }
  }
  /**
   * Opens a selection dialog with the configured options
   * @param opts The options for the dialog
   * @returns A reference of the selection dialog
   */
  openSelectionDialog(opts: SelectionDialogConfig): MatDialogRef<SelectionDialog> {
    if (opts) {
      const dialogRef = this.dialog.open(SelectionDialog, { disableClose: true, panelClass: 'selection-dialog' });
      dialogRef.componentInstance.selectionConfig = opts;
      return dialogRef;
    } else {
      this.throwError('opts', 'SelectionDialogConfig');
    }
  }
  /**
   * Gets all opens dialogs
   */
  getDialogs(): MatDialogRef<any>[] {
    return this.dialog.openDialogs;
  }
  /**
   * Closes all dialogs
   */
  closeAllDialogs() {
    this.dialog.closeAll();
  }
  /**
   * Gets a dialog by its id
   * @param {string} id The ID of the dialog
   */
  getDialogById(id: string): MatDialogRef<any> {
    return this.dialog.getDialogById(id);
  }
  /**
   * Observable for after all dialogs have been closed
   */
  afterAllClosed(): Observable<void> {
    return this.dialog.afterAllClosed;
  }
  /**
   * Throws an error with the specified parameters
   * @param variable The variable that was not specified
   * @param type The type of variable
   * @private
   */
  private throwError(variable: string, type: string) {
    // tslint:disable-next-line:max-line-length
    throw new Error(`${variable} was not specified. Please ensure that the ${variable} property is specified and that it is of type ${type}.`);
  }
  /**
   * Sets the document's title
   * @param title The title of the document to set
   */
  set title(title: string) {
    this._title = title;
    if (title !== '') {
      title = `${title} | `;
    }
    this.documentTitle.setTitle(`${title}Chan4077.Github.io`);
  }
  /**
   * Returns the document's title
   */
  get title(): string {
    return this._title;
  }
}


@Component({
  selector: 'alert-dialog',
  template: `
  <h2 matDialogTitle>{{alertConfig.title ? alertConfig.title : 'Alert'}}</h2>
  <mat-dialog-content fxLayout="column" class="mat-typography">
    <p class="mat-body" *ngIf="!alertConfig.isHtml">{{alertConfig.msg}}</p>
    <span *ngIf="alertConfig.isHtml" [innerHTML]="alertConfig.msg"></span>
  </mat-dialog-content>
  <mat-dialog-actions align="end">
    <button mat-button color="primary" (click)="close()">{{alertConfig.ok ? alertConfig.ok : 'Dismiss'}}</button>
  </mat-dialog-actions>
  `
})
export class AlertDialog implements OnInit {
  constructor(private dialogRef: MatDialogRef<AlertDialog>) {
  }
  alertConfig: AlertDialogConfig;
  close() {
    this.dialogRef.close();
  }
  ngOnInit() {
    if (this.alertConfig.disableClose) {
      this.dialogRef.disableClose = true;
    }
  }
}
@Component({
  selector: 'confirm-dialog',
  template: `
  <h2 matDialogTitle>{{confirmConfig.title ? confirmConfig.title : 'Confirm'}}</h2>
  <mat-dialog-content fxLayout="column" class="mat-typography">
    <p class="mat-body" *ngIf="!confirmConfig.isHtml">{{confirmConfig.msg}}</p>
    <span *ngIf="confirmConfig.isHtml" [innerHTML]="confirmConfig.msg"></span>
  </mat-dialog-content>
  <mat-dialog-actions align="end">
    <button mat-button (click)="cancel()" color="primary">{{confirmConfig.cancel ? confirmConfig.cancel : 'Cancel'}}</button>
    <button mat-button (click)="ok()" color="primary">{{confirmConfig.ok ? confirmConfig.ok : 'OK'}}</button>
  </mat-dialog-actions>
  `
})
export class ConfirmDialog implements OnInit {
  constructor(private dialogRef: MatDialogRef<ConfirmDialog>) {}
  confirmConfig: ConfirmDialogConfig;
  cancel() {
    this.dialogRef.close('cancel');
  }
  ok() {
    this.dialogRef.close('ok');
  }
  ngOnInit() {
    if (this.confirmConfig.disableClose) {
      this.dialogRef.disableClose = true;
    }
  }
}
@Component({
  selector: 'prompt-dialog',
  template: `
  <h2 matDialogTitle>{{promptConfig.title ? promptConfig.title : 'Prompt'}}</h2>
  <mat-dialog-content fxLayout="column" class="mat-typography">
    <p class="mat-body" *ngIf="!promptConfig.isHtml">{{promptConfig.msg}}</p>
    <span *ngIf="promptConfig.isHtml" [innerHTML]="promptConfig.msg"></span>
    <form #form="ngForm">
      <mat-form-field color="{{promptConfig.color ? promptConfig.color : 'primary'}}" style="width:100%" *ngIf="!promptConfig.textarea">
        <input matInput [(ngModel)]="input"
        placeholder="{{promptConfig.placeholder}}" type="{{promptConfig.inputType ? promptConfig.inputType : 'text'}}" required name="input">
        <mat-error>This is required.</mat-error>
      </mat-form-field>
      <mat-form-field color="{{promptConfig.color ? promptConfig.color : 'primary'}}" style="width:100%" *ngIf="promptConfig.textarea">
        <textarea matInput [(ngModel)]="input" placeholder="{{promptConfig.placeholder}}" required name="textarea"></textarea>
        <mat-error>This is required.</mat-error>
      </mat-form-field>
    </form>
  </mat-dialog-content>
  <mat-dialog-actions align="end">
    <button mat-button (click)="cancel()" color="primary">{{promptConfig.cancel ? promptConfig.cancel : 'Cancel'}}</button>
    <button mat-button (click)="ok()" color="primary" [disabled]="form.invalid">{{promptConfig.ok ? promptConfig.ok : 'OK'}}</button>
  </mat-dialog-actions>
  `
})
export class PromptDialog implements OnInit {
  constructor(private dialogRef: MatDialogRef<PromptDialog>) {
  }
  promptConfig: PromptDialogConfig;
  input: string | number;
  cancel() {
    this.dialogRef.close('cancel');
  }
  ok() {
    this.dialogRef.close(this.input);
  }
  ngOnInit() {
    if (this.promptConfig.value) {
      this.input = this.promptConfig.value;
    }
    if (this.promptConfig.disableClose) {
      this.dialogRef.disableClose = true;
    }
  }
}
@Component({
  selector: 'selection-dialog',
  template: `
  <h2 matDialogTitle>{{selectionConfig.title ? selectionConfig.title : 'Select options from the list'}}</h2>
  <mat-dialog-content fxLayout="column" class="mat-typography">
    <mat-selection-list #selection>
      <mat-list-option *ngFor="let option of selectionConfig.options"
      [disabled]="option.disabled" [value]="option.value"
      [checkboxPosition]="option.checkboxPosition ? option.checkboxPosition : 'before'" [selected]="option.selected">
        {{option.content}}
      </mat-list-option>
    </mat-selection-list>
  </mat-dialog-content>
  <mat-dialog-actions align="end">
    <button mat-button color="primary" (click)="cancel()">{{selectionConfig.cancel ? selectionConfig.cancel : 'Cancel'}}</button>
    <button mat-button color="primary" (click)="ok()"
    [disabled]="selection.selectedOptions.selected.length < 1">{{selectionConfig.ok ? selectionConfig.ok : 'OK'}}</button>
  </mat-dialog-actions>
  `
})
export class SelectionDialog implements OnInit {
  @ViewChild('selection') selection: MatSelectionList;
  constructor(private dialogRef: MatDialogRef<SelectionDialog>) {
  }
  selectionConfig: SelectionDialogConfig;
  ngOnInit() {
    if (this.selectionConfig.disableClose) {
      this.dialogRef.disableClose = true;
    }
  }
  cancel() {
    this.dialogRef.close('cancel');
  }
  ok() {
    this.dialogRef.close(this.selection.selectedOptions.selected);
  }
}
export interface SnackBarConfig {
  /**
   * The message for the snackBar
   */
  msg: string;
  /**
   * The action for the snackBar
   */
  action?: string;
  /**
   * The custom component for the snackBar to open in
   */
  component?: ComponentType<any>;
  /**
   * Additional options
   */
  additionalOpts?: MatSnackBarConfig;
}
export interface DialogConfig extends MatDialogConfig {
  /**
   * The message of the dialog
   */
  msg: string | SafeHtml;
  /**
   * The title of the dialog
   */
  title?: string;
  /**
   * Whether the dialog's message is HTML
   */
  isHtml?: boolean;
}
export interface AlertDialogConfig extends DialogConfig {
  /**
   * The ok button text
   */
  ok?: string;
}

export interface ConfirmDialogConfig extends DialogConfig {
  /**
   * The ok button text
   */
  ok?: string;
  /**
   * The cancel button text
   */
  cancel?: string;
}

export interface PromptDialogConfig extends DialogConfig {
  /**
   * The ok button text
   */
  ok?: string;
  /**
   * The cancel button text
   */
  cancel?: string;
  /**
   * Whether the input is a `<textarea>`
   */
  textarea?: boolean;
  /**
   * The placeholder of the input
   */
  placeholder: string;
  /**
   * The input type
   */
  inputType?: 'text' | 'email' | 'password' | 'number';
  /**
   * The initial value of the input
   */
  value?: string | number;
  /**
   * The color of the input
   */
  color?: 'primary' | 'accent' | 'warn';
}
export interface SelectionDialogConfig extends DialogConfig {
  /**
   * The ok button text
   */
  ok?: string;
  /**
   * The cancel button text
   */
  cancel?: string;
  /**
   * The options for the selection dialog
   */
  options: SelectionDialogOption[];
}
export interface SelectionDialogOption {
  /**
   * The title of the selection list item
   */
  content: string;
  /**
   * Whether the selection list item is disabled
   */
  disabled?: boolean;
  /**
   * The value of the selection list item
   */
  value: any;
  /**
   * The checkbox position of the selection list item
   */
  checkboxPosition?: 'before' | 'after';
  /**
   * Whether the selection list item is initially selected
   */
  selected?: boolean;
}
const SHARED_DIALOGS = [
  AlertDialog,
  ConfirmDialog,
  PromptDialog,
  SelectionDialog
];
@NgModule({
  declarations: [
    SHARED_DIALOGS
  ],
  exports: [
    SHARED_DIALOGS
  ],
  providers: [
    SharedService
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    MatCommonModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatSnackBarModule
  ],
  entryComponents: [
    SHARED_DIALOGS
  ]
})
export class SharedModule { }
