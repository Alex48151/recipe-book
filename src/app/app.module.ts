import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{ HttpClientModule} from "@angular/common/http"
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store'

import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { LoaggingService } from './logging.service';
import * as fromApp from './store/app.reduser'
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth/store/auth.effects';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    HttpClientModule,
    SharedModule, 
    CoreModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([AuthEffects]),
  ],
providers:[LoaggingService],
 
  bootstrap: [AppComponent],
  // entryComponents:[
  //   AlertComponent
  // ] For Dynamic Components
})
export class AppModule { }
