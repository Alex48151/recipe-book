import { Injectable } from "@angular/core";

//@Injectable({providedIn:'root'})
export class LoaggingService{
    lastlog: string;

    printLog(message:string){

        this.lastlog = message
    }
}