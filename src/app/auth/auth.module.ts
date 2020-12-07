import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { AuthComponents } from "./auth.component";

@NgModule({
  declarations:[AuthComponents],
  imports: [
    FormsModule,
    SharedModule,
    CommonModule,
    RouterModule.forChild([
      { path: '', component: AuthComponents }
])
]
})
export class AuthModule{

}