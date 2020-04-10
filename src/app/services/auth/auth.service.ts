import { HttpClient, HttpHeaders } from '@angular/common/http';
import {GLOBAL} from '../global';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    constructor(private http: HttpClient,
                private router: Router) {}

    authenticate(data: any) {
        return this.http.post<any>(GLOBAL.http + GLOBAL.routeLogin, data);
    }

    isAutenticate() {
        const expiresAt = parseInt(localStorage.getItem('expires_at'));
        return new Date().getTime() < expiresAt;
    }

    logoutService() {
        // elimina los datos creados en el localStorage
        localStorage.removeItem('userData');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
        // redirecciona a la pagina de login
        this.router.navigate(['/home']);
    }

    register(data: any) {
        return this.http.post<any>(GLOBAL.http + GLOBAL.routeRegister, data);
    }

}
