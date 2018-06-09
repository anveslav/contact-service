import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { IContact } from './icontact';

@Injectable()
export class ContactService {

  constructor(private http: Http) { }

  list(): Observable<any>{
    return this.http.get('http://localhost:3000/api/contacts');
  }

  view(id: string): Observable<any>{
    return this.http.get(`http://localhost:3000/api/contacts/${id}`);
  }

  save(id:string, contact: IContact): Observable<any>{
    return this.http.post(`http://localhost:3000/api/contacts/${id}`, contact);
  }

  add(contact: IContact): Observable<any>{
    return this.http.post(`http://localhost:3000/api/contacts`, contact);
  }

  delete(id): Observable<any>{
    return this.http.delete(`http://localhost:3000/api/contacts/${id}`);
  }

}
