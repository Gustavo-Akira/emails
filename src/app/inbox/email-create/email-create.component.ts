import { Component, OnInit } from '@angular/core';
import { Email } from '../email';
import { AuthService } from 'src/app/auth/auth.service';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-email-create',
  templateUrl: './email-create.component.html',
  styleUrls: ['./email-create.component.css']
})
export class EmailCreateComponent implements OnInit {
  email:Email;
  showModal=false;
  constructor( private authservice:AuthService, private emailservice:EmailService) { }

  ngOnInit() {
    this.email={
      id:'',
      to:'',
      subject:'',
      html:'',
      text:'',
      from:`${this.authservice.username}@angular-email.com`
    }
  }
  onSubmit(email:Email){
    console.log(email);
    this.emailservice.sendEmail(email).subscribe(()=>{
      this.showModal=false;
    });
  }
}
