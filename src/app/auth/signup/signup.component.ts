import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatchPassword } from '../validators/match-password';
import { Unique } from '../validators/unique';
import { AuthService } from '../auth.service';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  authForm= new FormGroup({
    username: new FormControl('',[
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[a-z0-9]+$/)
    ],
    [
      this.unique.validate
    ]
    ),
    password: new FormControl('',[
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(100)
    ]),
    passwordConfirmation: new FormControl('')
  },{validators:[this.match.validate]});
  constructor(private match: MatchPassword,private unique:Unique, private service: AuthService, private router: Router) { }

  ngOnInit() {
  }
  onSubmit(){
    this.service.signup(this.authForm.value).subscribe({
      next:(response)=>{
        this.router.navigateByUrl('/inbox');
      },
      error:(err)=>{
        if(!err.status){
          this.authForm.setErrors({noConnection:true});
        }else{
          this.authForm.setErrors({unknownError: true});
        }
      }
    })
  }
}
