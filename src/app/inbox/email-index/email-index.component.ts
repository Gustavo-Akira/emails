import { Component, OnInit } from '@angular/core';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-email-index',
  templateUrl: './email-index.component.html',
  styleUrls: ['./email-index.component.css']
})
export class EmailIndexComponent implements OnInit {
  emails = [];
  constructor(private emailservice: EmailService) { }

  ngOnInit() {
    this.emailservice.getEmails().subscribe((emails)=>{
      this.emails = emails;
    });
  }

}
