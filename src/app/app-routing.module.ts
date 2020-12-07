import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import { ShopingListModule } from "./shooping-list/shooping-list.moldule";


const appRoutes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch:'full'},
    {path: 'recipes', 
        loadChildren: 
         () => import('./recipes/recipes.module')
         .then(m => m.RecipesModule)},
    { path: 'shopping-list', 
        loadChildren:   
        () => import('./shooping-list/shooping-list.moldule')
        .then(m => m.ShopingListModule)},
    { path: 'auth',
        loadChildren:
        ()=>import('./auth/auth.module')
        .then(m => m.AuthModule)}
    
        // './recipes/recipes.module#RecipesModule'}
   
]
@NgModule({
    imports:[RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules } )],
    exports:[RouterModule]
})
export class AppRoutingModule{}