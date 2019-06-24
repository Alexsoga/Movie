import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import{LoginComponent} from './Client/login/login.component';
import { HeaderComponent } from "./Client/header/header.component";
import {DashboardComponent} from './Client/dashboard/dashboard.component';
import {ViewComponent} from './Client/view/view.component';
import {AddashboardComponent} from './Admin/addashboard/addashboard.component';
import {AdheaderComponent} from './Admin/adheader/adheader.component';
import {SiderbarComponent} from './Admin/siderbar/siderbar.component';
import {MovieAddingComponent} from './Admin/movie-adding/movie-adding.component';
import {UsersComponent} from './Admin/users/users.component';
const routes: Routes = [
  {path:'', component:LoginComponent},
  {path:'dashboard', component:DashboardComponent},
  {path:'header', component:HeaderComponent},
  {path:'view' , component:ViewComponent},
  {path:'addashboard', component:AddashboardComponent},
  {path:'adheader', component:AdheaderComponent},
  {path:'sidebar', component:SiderbarComponent},
  {path:'movieadd', component:MovieAddingComponent},
  {path:'users', component:UsersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
