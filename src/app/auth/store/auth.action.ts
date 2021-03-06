import { Action } from "@ngrx/store";

export const LOGIN_START = '[Auth] Login Start';
export const AUTHENDICATE_SECCESS = 'LOGIN';
export const AUTHENDICATE_FAIL = '[Auth] Login Fail';
export const SIGNUP_START = '[Auth] Sighup Start';
export const SIGNUP = '[Auth] Signup';
export const LOGOUT = 'LOGOUT';
export const CLEAR_ERROR = '[Auth] Clear Error '
export const AUTO_LOGIN = '[Auth] Auto Login'

export class AuthendicateSeccess implements Action{
    readonly type = AUTHENDICATE_SECCESS
    constructor( public payload : {
        email:string, 
        userId:string, 
        token:string,
        expitationDate:Date
    }
    ){}
}

export class Logout implements Action {
    readonly type = LOGOUT
}

export class LoginStart implements Action{
    readonly type = LOGIN_START;

    constructor(public payload:{
        email: string;
        password: string
    }){}
}
export class SignupStart implements Action {
    readonly type = SIGNUP_START;
    constructor(public payload:{
        email: string;
        password: string
    } ){}
}
export class Signup implements Action {
    readonly type = SIGNUP
    constructor(){}
}
export class AuthendicateFail implements Action {
    readonly type = AUTHENDICATE_FAIL;
    constructor(public payload: string){}
}
export class ClearError implements Action {
    readonly type = CLEAR_ERROR;
}
export class AutoLogin implements Action {
    readonly type = AUTO_LOGIN;
}

export type AuthActions =
    | AuthendicateSeccess
    | Logout
    | LoginStart
    | AuthendicateFail
    | Signup
    | SignupStart 
    | ClearError
    | AutoLogin;
