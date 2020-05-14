import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuardGuard } from './auth/auth-guard.guard';


const routes: Routes = [
  {
    path:'inbox',
    canLoad:[AuthGuardGuard],
    loadChildren:()=>import('./inbox/inbox.module').then(m=>m.InboxModule)
  },
  {path:'',component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
