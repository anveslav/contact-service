import { Component, OnInit, Inject } from '@angular/core';
import { MatTable, MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { ContactService } from '../contact.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-contact-view-dialog',
  templateUrl: './contact-view-dialog.component.html',
  styleUrls: ['./contact-view-dialog.component.css']
})
export class ContactViewDialogComponent implements OnInit {
  displayed: Boolean = false;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<any>,
    private contactService: ContactService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

  save(id: string, data: any) {
    delete data._id;
    this.contactService.save(id, data).map(response => response.json())
      .subscribe(response => {
        if (response.ok === 1) {
          this.notify(`${data.name} update.`);
          this.dialog.getDialogById('contact-dialog').close();
        }

      });
  }

  displayForm(): Boolean {
    return this.displayed = true;
  }

  openConfirmDialog(id) {
    const dialogRef: MatDialogRef<ConfirmDialogComponent> = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirmation',
        message: 'Are you sure to delete this contact?'
      }
    });
    dialogRef.afterClosed().subscribe((confirmation: Response) => {
      if (confirmation) {
        this.contactService.delete(id).map((response: any) => response.json()).subscribe(response => {
          if (response.ok === 1) {
            this.notify(`Contact is deleted!`);
            this.dialog.getDialogById('contact-dialog').close();
          }
        });
      }
    });
  }

  notify(message){
    this.snackBar.open(message, 'OK', { duration: 4000});
  }
}
