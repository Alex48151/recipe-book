import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { throwError } from "rxjs";
import { User } from "./user.model";
import { Store } from "@ngrx/store";
import * as fromApp from '../store/app.reduser';
import * as AuthActions from './store/auth.action';

export interface AuthResponceData{
    idToken:string;
    email:string;
    refreshToken:string;
    expiresIn:string;
    localId:string;
    registered?:boolean;
}
@Injectable({providedIn:'root'})
export class AuthService{
    //user = new BehaviorSubject<User>(null);
    tokenExpTimer:any;
    
    
    constructor(
        private http:HttpClient,
        private router:Router,
        private store : Store<fromApp.AppState>){}

    autoLogin(){
       const userData:{
           email:string,
           id:string,
           _token:string,
           _tokenExpDate:string
       } = JSON.parse(localStorage.getItem('userData'));
        if(!userData){
            return ;
        }
        const loadingUser = new User(
            userData.email,
            userData.id,
            userData._token,
            new Date(userData._tokenExpDate));
        if(loadingUser.token){
           // this.user.next(loadingUser)
           this.store.dispatch(new AuthActions.AuthendicateSeccess({
               email: loadingUser.email,
               userId: loadingUser.id,
               token: loadingUser.token,
               expitationDate: new Date(userData._tokenExpDate)
           }))
            const expDuration = new Date(userData._tokenExpDate).getTime() - new Date().getTime()
            this.autoLogout(expDuration);
        }
    }
    logout(){
        ///this.user.next(null);
        this.store.dispatch(new AuthActions.Logout())
        localStorage.removeItem('userData');
        if(this.tokenExpTimer){
            clearTimeout(this.tokenExpTimer)
        }
        this.tokenExpTimer = null;
    }

    autoLogout(expirationDuration:number){
        this.tokenExpTimer = setTimeout(() => {
            this.logout();
        },expirationDuration)
    }
    private handleAuthentication (
        email:string, 
        token:string, 
        userId:string, 
        expiresIn:number
        ){
        const expData = new Date(new Date().getTime()+ expiresIn *1000);
        const user = new User(email,userId,token,expData );
        //this.user.next(user);
        this.store.dispatch(new AuthActions.AuthendicateSeccess({
            email:email,
            userId:userId,
            token:token,
            expitationDate:expData
        }))
        this.autoLogout(expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user));
            
    }
    
}