import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';
import Swal from "sweetalert2";

@Component({
  selector: 'app-registerpage',
  templateUrl: 'registerpage.component.html'
})
export class RegisterpageComponent implements OnInit, OnDestroy {
  isCollapsed = true;
  focus;
  focus1;
  focus2;
  focus3;
  focus4;
  public formRegister: FormGroup;

  constructor(
      private authService: AuthService,
      private router: Router
  ) {
    if (localStorage.getItem('id_token')) {
      this.router.navigate(['/home']);
    }
    /*Se realiza la instacia del formulario que se mostrara en la vista con sus respectivas validaciones*/
    this.formRegister = new FormGroup({
      data: new FormGroup({
        name: new FormControl('', [Validators.required]),
        phone: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required,
          Validators.pattern('^([a-zA-Z0-9_.+-])+\\@(([a-zA-Z0-9-])+\\.)+([a-zA-Z0-9]{2,4})+$')]),
        password: new FormControl('', [Validators.required]),
        rePassword: new FormControl('', [Validators.required]),
      })
    });
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e) {
    const squares1 = document.getElementById('square1');
    const squares2 = document.getElementById('square2');
    const squares3 = document.getElementById('square3');
    const squares4 = document.getElementById('square4');
    const squares5 = document.getElementById('square5');
    const squares6 = document.getElementById('square6');
    const squares7 = document.getElementById('square7');
    const squares8 = document.getElementById('square8');

    const posX = e.clientX - window.innerWidth / 2;
    const posY = e.clientY - window.innerWidth / 6;

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
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('register-page');

    this.onMouseMove(event);
  }
  ngOnDestroy() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('register-page');
  }

  onSubmit() {
    const data = this.formRegister.value.data;

    if (data.password !== data.rePassword) {
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Las contraseñas deben de coincidir',
      });
      return;
    }

    this.authService.register(data).subscribe((resp: any) => {
      if (resp.success) {
        Swal.fire({
          type: 'success',
          title: 'Éxito',
          text: resp.message,
        });
        this.router.navigate(['/login']);
      }
    }, error => {
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: error.error.message,
      });
    });
  }

}
