import { Action } from "@ngrx/store";
import { Ingredient } from "src/app/shared/ingredient.model";

export const ADD_INGREDIET = 'ADD_INGREDIET';
export const ADD_INGREDIETS = 'ADD_INGREDIETS';
export const UPDATE_INGREDIENT = 'UPDATE_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const START_EDIT= '[ShoppingList] Star Edit';
export const STOP_EDIT = '[ShoppingList] Stop Edit';


export class AddIngredient implements Action {
   readonly type = ADD_INGREDIET;


   constructor(public payload: Ingredient){}
}

export class AddIngredients implements Action {
   readonly type = ADD_INGREDIETS;

   constructor(public payload:Ingredient[]){
   }
}
export class UpdateIngredient implements Action {
   readonly type = UPDATE_INGREDIENT;
   constructor(public payload:Ingredient){}
}
export class DeleteIngredient implements Action {
   readonly type = DELETE_INGREDIENT;

}
export class StartEdit implements Action{
   readonly type =  START_EDIT
   
   constructor(public playload:number){}
}
export class StopEdit implements Action{
   readonly type = STOP_EDIT
}

export type ShoppingListActions = 
| AddIngredient
| AddIngredients 
| UpdateIngredient 
| DeleteIngredient 
| StartEdit
| StopEdit;