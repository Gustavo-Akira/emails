import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  signinForm = new FormGroup({
    username: new FormControl('',[
       Validators.required,
       Validators.minLength(3),
       Validators.maxLength(20),
       Validators.pattern(/^[a-z0-9]+$/)
    ]),
    password: new FormControl('',[
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(100)
    ])
  })
  constructor(private authService:AuthService, private router: Router) { }

  ngOnInit() {
  }
  onSubmit(){
    this.authService.signin(this.signinForm.value)
    .subscribe({
      next:()=>{
        this.router.navigateByUrl('/inbox');
      },
      error: ({error}) =>{
        if(error.username || error.password){
          this.signinForm.setErrors({credentials:true});
        }
      }
    });
  }
}
