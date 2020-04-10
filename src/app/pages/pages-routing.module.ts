import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ProfilepageComponent} from './examples/profilepage/profilepage.component';
import {LandingpageComponent} from './examples/landingpage/landingpage.component';
import {ListorderComponent} from './order/list/listorder.component';

const routes: Routes = [
    { path: 'profile', component: ProfilepageComponent },
    { path: 'landing', component: LandingpageComponent },

    { path: 'listOrder', component: ListorderComponent },

  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {
}
