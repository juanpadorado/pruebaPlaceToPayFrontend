import {Component, OnInit} from '@angular/core';
import noUiSlider from 'nouislider';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html'
})
export class HeaderComponent implements OnInit {

  isCollapsed = true;
  userData: any = [];

  constructor(
      private _authService: AuthService
  ) {
    this.userData = JSON.parse(localStorage.getItem('userData'));
  }

  ngOnInit() {

  }

  isAutenticate() {
    return this._authService.isAutenticate();
  }

  logout() {
    this._authService.logoutService();
  }
}
