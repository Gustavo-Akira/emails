import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeInboxComponent } from './home-inbox/home-inbox.component';
import { PlaceholderComponent } from './placeholder/placeholder.component';
import { EmailShowComponent } from './email-show/email-show.component';
import { EmailResolverService } from './email-resolver.service';


const routes: Routes = [
  {
    path:'',
    component:HomeInboxComponent,
    children:[
      {path:'',component:PlaceholderComponent},
      {path:':id',component:EmailShowComponent,
      resolve:{
        email:EmailResolverService
      }}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InboxRoutingModule { }
