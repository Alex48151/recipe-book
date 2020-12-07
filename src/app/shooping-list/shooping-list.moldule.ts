
import { NgModule } from "@angular/core";
import { FormsModule} from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";

import { ShoopingListEditComponent } from "./shooping-list-edit/shooping-list-edit.component";
import { ShoopingListComponent } from "./shooping-list.component";

@NgModule({
    declarations:[
        ShoopingListComponent,
        ShoopingListEditComponent,
    ],
    imports:[
        RouterModule.forChild([ 
            { path: '', component: ShoopingListComponent }
        ]),
        FormsModule,
        SharedModule
    ]
})
export class ShopingListModule {

}