import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import {PagesComponent} from './pages/pages.component';
import {LoginComponent} from './pages/login/login.component';
import {AuthGuard} from './gards/auth.gard';
import {IndexComponent} from './pages/index/index.component';
import {RegisterpageComponent} from './pages/registerpage/registerpage.component';
import {ListshoppingcartComponent} from './pages/shoppingCart/list/listshoppingcart.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: IndexComponent },
  { path: 'register', component: RegisterpageComponent },
  { path: 'listShoppingCart', component: ListshoppingcartComponent },
  {
    path: '',
    component: PagesComponent,
    loadChildren: './pages/pages.module#PagesModule',
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
