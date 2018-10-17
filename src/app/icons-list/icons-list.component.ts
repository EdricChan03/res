import { SharedService } from '../shared.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { trigger, style, animate, transition } from '@angular/animations';
import { CodeSnippetComponent } from '../code-snippet/code-snippet.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatMenuTrigger } from '@angular/material/menu';
import { ActivatedRoute } from '@angular/router';
import { IconInfoDialogComponent } from '../dialogs/icon-info-dialog/icon-info-dialog.component';
import { Contributor, Icon, SearchCategory } from '../interfaces';
@Component({
  selector: 'app-icons-list',
  templateUrl: './icons-list.component.html',
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
export class IconsListComponent implements OnInit {
  icons: Observable<Icon[]>;
  filteredIcons: Observable<Icon[]>;
  contributors: Observable<Contributor[]>;
  selectedIcon: string;
  searchField: string;
  category: 'name' | 'tag' | 'alias' | 'author';
  categories: string[];
  multipleCategories: boolean;
  iconSelected: boolean;
  showSearch = false;
  searchForm: FormGroup;
  constructor(
    private http: HttpClient,
    private shared: SharedService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.searchForm = this.fb.group({
      query: ['', Validators.required],
      category: ['', Validators.required]
    });
    route.queryParams.subscribe(params => {
      for (const prop of Object.keys(params)) {
        // this.params[prop] = params[prop];
        if (this.searchForm.get(prop)) {
          console.log(`Form control '${prop}' set to '${params[prop]}'`);
          this.searchForm.get(prop).setValue(params[prop]);
        }
      }
      if (params.hasOwnProperty('query') && params.hasOwnProperty('category')) {
        this.showSearch = true;
      }
    });
  }
  get isMobile() {
    return this.shared.isMobile();
  }
  hasScrolled(): boolean {
    if (document.getElementById('sidenav-content').scrollTop > 20) {
      return true;
    } else {
      return false;
    }
  }
  ngOnInit() {
    setTimeout(() => {
      if (this.searchForm.controls['query'].value != null) {
        this.search();
      }
    });
    this.shared.title = 'Home';
    this.icons = this.http.get<Icon[]>(this.shared.mdiIconListApi);
    this.contributors = this.http.get<Contributor[]>(this.shared.mdiContributorsApi);
  }
  onContextMenu(event: MouseEvent, icon: Icon, menuTrigger: MatMenuTrigger, spanHtml: HTMLSpanElement) {
    // Prevent the browser's context menu from showing
    event.preventDefault();
    console.log(event);
    spanHtml.style.left = `${event.clientX}px`;
    spanHtml.style.top = `${event.clientY}px`;
    menuTrigger.openMenu();
  }
  search() {
    if (this.searchForm.get('category').value != null) {
      switch (this.searchForm.get('category').value as SearchCategory) {
        case 'alias':
          this.filteredIcons = this.icons.pipe(
            map(icons => icons.filter(icon => icon.aliases.indexOf(this.searchForm.get('query').value.toLowerCase()) > -1))
          );
          break;
        case 'author':
          this.filteredIcons = this.icons.pipe(
            map(icons => icons.filter(icon => icon.author.indexOf(this.searchForm.get('query').value.toLowerCase()) > -1))
          );
          break;
        case 'name':
          this.filteredIcons = this.icons.pipe(
            map(icons => icons.filter(icon => icon.name.indexOf(this.searchForm.get('query').value.toLowerCase()) > -1))
          );
          break;
        case 'tag':
          this.filteredIcons = this.icons.pipe(
            map(icons => icons.filter(icon => icon.tags.indexOf(this.searchForm.get('query').value.toLowerCase()) > -1))
          );
          break;
      }
    }
  }
  selected(name: string) {
    console.log(`Icon selected: ${name}`);
    if (this.selectedIcon === name) {
      this.selectedIcon = null;
      this.iconSelected = false;
    } else {
      this.selectedIcon = name;
      if (this.iconSelected) {
        this.iconSelected = false;
      }
      setTimeout(() => {
        this.iconSelected = true;
      }, 50);
    }
  }

  showCodeSnippet(selectedIcon?: string) {
    const dialogRef = this.dialog.open(CodeSnippetComponent);
    if (selectedIcon) {
      dialogRef.componentInstance.selectedIcon = selectedIcon;
    } else {
      dialogRef.componentInstance.selectedIcon = this.selectedIcon;
    }
  }
  showIconInfo(icon: Icon) {
    this.dialog.open<IconInfoDialogComponent, Icon>(IconInfoDialogComponent, {
      data: icon
    });
  }
}
