import { ActionReducerMap } from '@ngrx/store'
import * as fromShoppingList from '../shooping-list/store/shooping-list.reducer'
import * as fromAuth from '../auth/store/auth.reduser'



export interface AppState {
    shoppingList :fromShoppingList.State;
    auth: fromAuth.State;
}

export const appReducer: ActionReducerMap<AppState> = {
    shoppingList: fromShoppingList.shoppingListReducer,
    auth: fromAuth.authReduser
}