import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Observable, Subscription } from 'rxjs';
import { LoaggingService } from '../logging.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reduser'
import * as ShoppingListActions from './store/shooping-list.actions'

@Component({
  selector: 'app-shooping-list',
  templateUrl: './shooping-list.component.html',
  styleUrls: ['./shooping-list.component.css']

})
export class ShoopingListComponent implements OnInit, OnDestroy {
  ingrediens: Observable<{ingrediens: Ingredient[]}> 
  private idChangeSub: Subscription;

  constructor(
    private loggingService:LoaggingService,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
   this.ingrediens =  this.store.select('shoppingList');
   

  //  this.ingrediens = this.slService.getIngredients();
  //  this.idChangeSub = this.slService.ingredientsChanged
  //   .subscribe(
  //     (ingrediens:Ingredient[])=>{
  //       this.ingrediens = ingrediens;
  //     }
  //   )
    this.loggingService.printLog('hello from ShoppingList NgOnit')
  }
  onEditItem(index:number) {
    //this.slService.startedEditing.next(index);
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }
  ngOnDestroy(){
    // this.idChangeSub.unsubscribe();
  }

}
