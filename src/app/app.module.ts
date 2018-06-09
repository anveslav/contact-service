import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { ContactListComponent } from './contact-list/contact-list.component';

import {
  MatTableModule, MatButtonModule, MatDialogModule, MatIconModule,
  MatFormFieldModule, MatInputModule, MatSnackBarModule
} from '@angular/material';

import { ContactService } from './contact.service';
import { ContactViewDialogComponent } from './contact-view-dialog/contact-view-dialog.component';
import { ContactAddComponent } from './contact-add/contact-add.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';





@NgModule({
  declarations: [
    AppComponent,
    ContactListComponent,
    ContactViewDialogComponent,
    ContactAddComponent,
    ConfirmDialogComponent
  ],
  entryComponents: [
    ContactViewDialogComponent,
    ContactAddComponent,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule
  ],
  providers: [
    ContactService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
