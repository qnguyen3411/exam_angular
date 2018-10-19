import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { ShowComponent } from './show/show.component';
import { AddeditComponent } from './addedit/addedit.component';

const routes: Routes = [
  { path: 'pets', component: IndexComponent},
  {path: 'pets/new', component: AddeditComponent},
  {path: 'pets/:id', component: ShowComponent},
  {path: 'pets/:id/edit', component: AddeditComponent},
  {path: '', pathMatch: 'full', redirectTo: '/pets' },
   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
