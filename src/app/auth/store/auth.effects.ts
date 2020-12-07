import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment'
import {Actions, Effect, ofType} from '@ngrx/effects'
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as AuthActions from './auth.action'
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user.model';

export interface AuthResponceData{
	idToken:string;
	email:string;
	refreshToken:string;
	expiresIn:string;
	localId:string;
	registered?:boolean;
} 
const handleAuthendication = (expiresIn:number, email: string, userId:string, token: string) =>{
	const expData = new Date(new Date().getTime() + expiresIn *1000);
	const user = new User(email, userId, token, expData);
	localStorage.setItem('userData', JSON.stringify(user));
	return new AuthActions.AuthendicateSeccess({
			email: email, 
			userId: userId,
			token:token, 
			expitationDate: expData
		}
	);
};

const handleError = (errorRes: any) =>{
	let errorMessage = 'Anunknow error occured!';
		if( !errorRes.error || !errorRes.error.error){
			return of( new AuthActions.AuthendicateFail(errorMessage))
		}
		switch(errorRes.error.error.message) {
			case 'EMAIL_EXISTS':
				errorMessage = 'This Email exist';
				break;
			case 'EMAIL_NOT_FOUND':
				errorMessage = 'Email not Found';
				break;
			case 'INVALID_PASSWORD':
				errorMessage='Password is wrong'
				break;
				}
		return of(new AuthActions.AuthendicateFail(errorMessage));
	};

@Injectable()
export class AuthEffects {
	@Effect()
	authSignup = this.actions$.pipe(
		ofType(AuthActions.SIGNUP_START),
		switchMap((signupAction: AuthActions.SignupStart ) => {
			return this.http.post<AuthResponceData>(
				'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key='+ environment.firebaseAPIkey,
			 {
					 email: signupAction.payload.email,
					 password: signupAction.payload.password,
					 returnSecureToken:true
			 } 
		 	).pipe(
			map(resData =>{
			return	handleAuthendication(
					+resData.expiresIn, 
					resData.email,
					resData.localId,
					resData.idToken);
			}),
			catchError(errorRes =>{
			return	handleError(errorRes)
			}) 
		);
		 })
  );
  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      return this.http
        .post<AuthResponceData>(
          'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' +
            environment.firebaseAPIkey,
          {
            email: authData.payload.email,
            password: authData.payload.password,
            returnSecureToken: true
          }
        )
        .pipe(
          map(resData => {
            return handleAuthendication(
              +resData.expiresIn,
              resData.email,
              resData.localId,
              resData.idToken
            );
          }),
          catchError(errorRes => {
            return handleError(errorRes);
          })
        );
    })
  );
	
  @Effect({dispatch:false})
  authRedirect = this.actions$
  .pipe(ofType(AuthActions.AUTHENDICATE_SECCESS, AuthActions.LOGOUT),
   tap(()=>{
  this.router.navigate(['/']);
  })
  );

  @Effect()
  autoLogin = this.actions$.pipe(
    ofType(AuthActions.AUTO_LOGIN),
    map(() => {
      const userData: {
        email: string;
        id: string;
        _token: string;
        _tokenExpirationDate: string;
      } = JSON.parse(localStorage.getItem('userData'));
      if (!userData) {
        return { type: 'DUMMY' };
      }

      const loadedUser = new User(
        userData.email,
        userData.id,
        userData._token,
        new Date(userData._tokenExpirationDate)
      );

      if (loadedUser.token) {
		// this.user.next(loadedUser);
	    // const expirationDuration =
        //   new Date(userData._tokenExpirationDate).getTime() -
        //   new Date().getTime();
        // this.autoLogout(expirationDuration);
        return new AuthActions.AuthendicateSeccess({
          email: loadedUser.email,
          userId: loadedUser.id,
          token: loadedUser.token,
          expitationDate: new Date(userData._tokenExpirationDate)
        });

        // const expirationDuration =
        //   new Date(userData._tokenExpirationDate).getTime() -
        //   new Date().getTime();
        // this.autoLogout(expirationDuration);
      }
      return { type: 'DUMMY' };
    })
  );


	@Effect({dispatch:false})
	authLogout = this.actions$.pipe(
		ofType(AuthActions.LOGOUT), 
		tap(()=>{
		localStorage.removeItem('userData');
	}))

    constructor( 
	  private actions$: Actions,
	  private http :HttpClient,
	  private router : Router) {}
}