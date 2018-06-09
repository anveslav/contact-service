import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { IContact } from '../icontact';

@Component({
  selector: 'app-contact-add',
  templateUrl: './contact-add.component.html',
  styleUrls: ['./contact-add.component.css']
})
export class ContactAddComponent implements OnInit {

  data: Object= {};
  constructor(public contactService: ContactService,
    public dialogRef: MatDialogRef<ContactAddComponent>,
    public snackBar: MatSnackBar) { }

  save(contact: IContact): void {
    this.contactService.add(contact).subscribe((response: Response) => {
      if (response.ok) {
        this.notify(`${contact.name} is added to your contact list!`);
        this.close();
      }
    })
  }

  notify(message: string): void{
    this.snackBar.open(message, 'OK', { duration: 4000});
  }

  close(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
