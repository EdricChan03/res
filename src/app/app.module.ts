import { SharedModule } from './shared.service';
import { AppRouting } from './app.routing';
import { CodeViewerComponent } from './code-viewer/code-viewer.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';

import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GettingStartedComponent } from './guides/getting-started/getting-started.component';
import { IconsListComponent } from './icons-list/icons-list.component';
import { CodeSnippetComponent } from './code-snippet/code-snippet.component';
import { HomeComponent } from './home/home.component';

@NgModule({
	declarations: [
		AppComponent,
		CodeViewerComponent,
		GettingStartedComponent,
		IconsListComponent,
		CodeSnippetComponent,
		HomeComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		FlexLayoutModule,
		HttpClientModule,
		MaterialModule,
		SharedModule,
		AppRouting
	],
	bootstrap: [AppComponent],
	entryComponents: [
		CodeSnippetComponent
	]
})
export class AppModule {}
