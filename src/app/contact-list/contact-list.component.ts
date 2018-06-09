import { Component } from '@angular/core';
import { IContact } from '../icontact';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ContactService } from '../contact.service';
import { MatTable, MatDialog, MatDialogRef } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { ContactViewDialogComponent } from '../contact-view-dialog/contact-view-dialog.component';
import { ContactAddComponent } from '../contact-add/contact-add.component';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent {

  displayedColumns: string[] = ['name', 'phone', 'email', 'view'];
  dataSource: DataSource<any> = new ContactDataSource(this.contactService);


  private contacts: IContact[];

  constructor(private contactService: ContactService, private dialog: MatDialog) {

    this.contactService.list().map(response => response.json())
      .subscribe(response => this.contacts = response);
  }

  openDialog(id: string): void {
    this.contactService.view(id)
      .map(response => response
        .json())
      .subscribe((response: Promise<Response>) => {
        const dialogRef: MatDialogRef<ContactViewDialogComponent> = this.dialog.open(ContactViewDialogComponent, {
          id: 'contact-dialog',
          width: '450px',
          data: response
        });

        dialogRef.afterClosed().subscribe(() => this.dataSource = new ContactDataSource(this.contactService));
      });
  }

  openAddDialog() {
    const dialogRef: MatDialogRef<ContactAddComponent> = this.dialog.open(ContactAddComponent, {
      width: '450px'
    });
    dialogRef.afterClosed().subscribe(() => this.dataSource = new ContactDataSource(this.contactService));
  }
}

export class ContactDataSource extends DataSource<any>{
  constructor(private contactService: ContactService) {
    super();
  }
  connect(): Observable<any> {
    return this.contactService.list()
      .map(response => response.json());
  }

  disconnect() {
  }
}