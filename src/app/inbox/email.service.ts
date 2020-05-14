import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Email } from './email';
interface EmailSummary{
  id:string;
  subject:string;
  from:string;
}
@Injectable({
  providedIn: 'root'
})
export class EmailService {
  url = 'https://api.angular-email.com';
  constructor(private http:HttpClient) { }
  getEmails(){
    return this.http.get<EmailSummary[]>(`${this.url}/emails`,{withCredentials:true});
  }
  getEmail(id: string){
    return this.http.get<Email>(`${this.url}/emails/${id}`)
  }
  sendEmail(email:Email){
    return this.http.post(`${this.url}/emails`,email,{withCredentials:true});
  }
}
