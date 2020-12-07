
import { Action } from "@ngrx/store";
import { Ingredient } from "../../shared/ingredient.model";
import * as ShoppingListActions from './shooping-list.actions'

export interface State {
  ingrediens:Ingredient[];
  editedIngedient:Ingredient;
  editedIngedientIndex:number;
}

const initialState:State ={
  ingrediens:[
      new Ingredient('pasta', 5),
      new Ingredient('tomato', 10)
    ],
    editedIngedient:null,
    editedIngedientIndex:-1
};

export function shoppingListReducer(
  state:State = initialState, 
  action: ShoppingListActions.ShoppingListActions) {
    switch(action.type){
      case ShoppingListActions.ADD_INGREDIET:
        return {
          ...state,
          ingrediens: [...state.ingrediens, action.payload]
        };
        case ShoppingListActions.ADD_INGREDIETS:
          return {
            ... state,
            ingrediens:[...state.ingrediens, ...action.payload]
          }
        case ShoppingListActions.UPDATE_INGREDIENT:
          const ingredient = state.ingrediens[state.editedIngedientIndex];
          const updateIngredient = {
            ...ingredient,
            ...action.payload
          };
          const updateIngredients = [...state.ingrediens];
          updateIngredients[state.editedIngedientIndex] = updateIngredient;

          return{
            ...state,
            ingrediens:updateIngredients,
            editedIngedient:null,
            editedIngedientIndex: -1
          }
        case ShoppingListActions.DELETE_INGREDIENT:
          return{
            ...state,
            ingrediens: state.ingrediens.filter((ig, igIndex) =>{
              return igIndex !== state.editedIngedientIndex;
            }),
            editedIngedient:null,
              editedIngedientIndex: -1
          }
          case ShoppingListActions.START_EDIT:
            return{
              ...state,
              editedIngedientIndex: action.playload,
              editedIngedient: {...state.ingrediens[action.playload]}
            };
          case ShoppingListActions.STOP_EDIT:
            return{
              ...state,
              editedIngedient:null,
              editedIngedientIndex: -1
            };
        default: 
        return state;
      }
}