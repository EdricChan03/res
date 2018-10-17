import { GettingStartedComponent } from './guides/getting-started/getting-started.component';
import { HomeComponent } from './home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { IconsListComponent } from './icons-list/icons-list.component';
import { AboutComponent } from './about/about.component';

const APP_ROUTES: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'icons-list', component: IconsListComponent },
  {
    path: 'guides', children: [
      { path: 'getting-started', component: GettingStartedComponent }
    ]
  },
  { path: 'guides', redirectTo: '/guides/getting-started', pathMatch: 'full' },
  { path: 'about', component: AboutComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

export const AppRouting: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);