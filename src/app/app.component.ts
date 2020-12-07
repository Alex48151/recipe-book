import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { LoaggingService } from './logging.service';
import * as fromApp from './store/app.reduser'
import * as AuthActions from './auth/store/auth.action'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private store : Store<fromApp.AppState>, 
              private loagingService:LoaggingService){}
  ngOnInit(){
    this.store.dispatch( new AuthActions.AutoLogin())
    this.loagingService.printLog('Hello from AppComponent Ngoninit')
  }
}
