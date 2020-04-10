import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import noUiSlider from 'nouislider';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth/auth.service';
import * as jwt_decode from 'jwt-decode';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit, OnDestroy {

  isCollapsed = true;
  focus;
  focus1;
  focus2;
  public formLogin: FormGroup;

  constructor(
      private _authService: AuthService,
      private router: Router
  ) {

    if (localStorage.getItem('id_token')) {
      this.router.navigate(['/home']);
    }
    /*Se realiza la instacia del formulario que se mostrara en la vista con sus respectivas validaciones*/
    this.formLogin = new FormGroup({
      data: new FormGroup({
        email: new FormControl('', [Validators.required,
          Validators.pattern('^([a-zA-Z0-9_.+-])+\\@(([a-zA-Z0-9-])+\\.)+([a-zA-Z0-9]{2,4})+$')]),
        password: new FormControl('', [Validators.required]),
      })
    });
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e) {
    let squares1 = document.getElementById('square1');
    let squares2 = document.getElementById('square2');
    let squares3 = document.getElementById('square3');
    let squares4 = document.getElementById('square4');
    let squares5 = document.getElementById('square5');
    let squares6 = document.getElementById('square6');
    let squares7 = document.getElementById('square7');
    let squares8 = document.getElementById('square8');

    let posX = e.clientX - window.innerWidth / 2;
    let posY = e.clientY - window.innerWidth / 6;

    squares1.style.transform =
        'perspective(500px) rotateY(' +
        posX * 0.05 +
        'deg) rotateX(' +
        posY * -0.05 +
        'deg)';
    squares2.style.transform =
        'perspective(500px) rotateY(' +
        posX * 0.05 +
        'deg) rotateX(' +
        posY * -0.05 +
        'deg)';
    squares3.style.transform =
        'perspective(500px) rotateY(' +
        posX * 0.05 +
        'deg) rotateX(' +
        posY * -0.05 +
        'deg)';
    squares4.style.transform =
        'perspective(500px) rotateY(' +
        posX * 0.05 +
        'deg) rotateX(' +
        posY * -0.05 +
        'deg)';
    squares5.style.transform =
        'perspective(500px) rotateY(' +
        posX * 0.05 +
        'deg) rotateX(' +
        posY * -0.05 +
        'deg)';
    squares6.style.transform =
        'perspective(500px) rotateY(' +
        posX * 0.05 +
        'deg) rotateX(' +
        posY * -0.05 +
        'deg)';
    squares7.style.transform =
        'perspective(500px) rotateY(' +
        posX * 0.02 +
        'deg) rotateX(' +
        posY * -0.02 +
        'deg)';
    squares8.style.transform =
        'perspective(500px) rotateY(' +
        posX * 0.02 +
        'deg) rotateX(' +
        posY * -0.02 +
        'deg)';
  }

  ngOnInit() {
    let body = document.getElementsByTagName('body')[0];
    body.classList.add('register-page');

    this.onMouseMove(event);
  }
  ngOnDestroy() {
    let body = document.getElementsByTagName('body')[0];
    body.classList.remove('register-page');
  }

  onSubmit() {
    const data = this.formLogin.value.data;

    this._authService.authenticate(data).subscribe((resp: any) => {
      if (resp.success) {
        const exp = JSON.stringify((jwt_decode(resp.token).exp * 1000) + new Date().getTime());
        localStorage.setItem('id_token', resp.token);
        localStorage.setItem('expires_at', exp);
        localStorage.setItem('userData', JSON.stringify(resp.user));
        this.router.navigate(['/home']);
      } else {
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: resp.message,
        });
      }
    }, error => {
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: error.error.message,
      });
    });
  }

  register() {
    this.router.navigate(['/register']);
  }
}
