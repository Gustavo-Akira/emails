import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';


interface UsernameAvailableResponse{
  available:boolean;
}

interface SignupCredentials{
  username:string;
  password:string;
  passwordConfirmation:string;
}

interface SignupResponse{
  username:string;
}

interface SignedInResponse{
  authenticated:boolean;
  username:string;
}
interface SigninCredentials{
  password:string;
  username:string;
}
interface SigninResponse{
  username:string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url='https://api.angular-email.com';
  signedIn$ = new BehaviorSubject(null);
  username='';
  constructor(private http:HttpClient) { }

  usernameAvailable(username:string){
    return this.http.post<UsernameAvailableResponse>(`${this.url}/auth/username`,{
      username
    });
  }

  signup(credentials:SignupCredentials){
    return this.http.post<SignupResponse>(
      `${this.url}/auth/signup`,
      credentials,
      {
        withCredentials:true
      }
    ).pipe(
      tap(({username})=>{
        this.signedIn$.next(true);
        this.username = username;
      })
    )
  }

  checkAuth(){
    return this.http.get<SignedInResponse>(`${this.url}/auth/signedin`).pipe(
      tap(({authenticated, username})=>{
        this.signedIn$.next(authenticated);
        this.username = username;
      })
    );
  }

  signout(){
    return this.http.post(`${this.url}/auth/signout`,{})
    .pipe(
      tap(()=>{
        this.signedIn$.next(false);
      })
    )
  }
  signin(credentials:SigninCredentials){
    return this.http.post<SigninResponse>(`${this.url}/auth/signin`,credentials)
    .pipe(
      tap(({username})=>{
        this.signedIn$.next(true);
        this.username = username;
      })
    )
  }
}
