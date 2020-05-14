import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  signein:BehaviorSubject<boolean>;
  constructor(private authService: AuthService){
    this.signein = this.authService.signedIn$;
  }
  ngOnInit(){
    this.authService.checkAuth().subscribe(()=>{});
  }
}
