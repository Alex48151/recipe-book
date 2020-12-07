import { Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { Ingredient } from 'src/app/shared/ingredient.model';
import * as ShoppingListActions from '../store/shooping-list.actions'
import * as fromApp from '../../store/app.reduser'

@Component({
  selector: 'app-shooping-list-edit',
  templateUrl: './shooping-list-edit.component.html',
  styleUrls: ['./shooping-list-edit.component.css']
})
export class ShoopingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('f',{static:false}) slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItem: Ingredient;

  constructor( 

    private store :Store<fromApp.AppState>
    ) { }

  ngOnInit(): void {
   this.subscription = this.store.select('shoppingList').subscribe(stateData=>{
      if(stateData.editedIngedientIndex>-1){
        this.editMode = true;
        this.editedItem = stateData.editedIngedient;
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      } else {
        this.editMode = false;
      }
    });
  //   this.subscription  =  this.slService.startedEditing
  //     .subscribe(
  //       (index:number)=>{
  //         this.editedItemIndex = index;
  //         this.editMode = true;
  //         this.editedItem = this.slService.getIngredient(index);
          
  //       }
  //     );
  }

  onSubmit(form: NgForm){
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if(this.editMode){
        //this.slService.updateIngredient(this.editedItemIndex, newIngredient)
      this.store.dispatch( new ShoppingListActions.UpdateIngredient( newIngredient))
    } else {
      //this.slService.addIngredient(newIngredient)
      this.store.dispatch( new ShoppingListActions.AddIngredient(newIngredient));
    }
    this.editMode = false;
    form.reset();
  }
  onClear(){
   this.slForm.reset();
   this.editMode = false;
   this.store.dispatch(new ShoppingListActions.StopEdit());
  }
  onDelete(){
    //this.slService.deleteIngredient(this.editedItemIndex);
    this.store.dispatch(new ShoppingListActions.DeleteIngredient())
    this.onClear()
  }
 ngOnDestroy(){
   this.subscription.unsubscribe();
   this.store.dispatch(new ShoppingListActions.StopEdit());
 }
}
