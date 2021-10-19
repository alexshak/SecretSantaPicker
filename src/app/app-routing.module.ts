import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SsmMainComponent } from './ssm-main/ssm-main.component';

const routes: Routes = [
  { path: '', component: SsmMainComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
