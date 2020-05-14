import { Injectable } from '@angular/core';
import { AsyncValidator, FormControl } from '@angular/forms';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Injectable({providedIn:'root'})
export class Unique implements AsyncValidator{
    constructor(private service:AuthService){

    }
    validate =(control:FormControl)=>{
        const {value}=control;
        return this.service.usernameAvailable(value)
        .pipe(
            map(value=>{
                if(value.available){
                    console.log(true);
                    return null;
                }
            }),
            catchError((err)=>{
                console.log(err);
                if(err.error.username){
                    return of({nonUniqueUsername:true});
                }else{
                    return of({noConnection:true});
                }
            })
        );
    }
}
