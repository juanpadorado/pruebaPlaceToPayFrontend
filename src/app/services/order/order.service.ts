import { HttpClient, HttpHeaders } from '@angular/common/http';
import {GLOBAL} from '../global';
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})

/*Clase de servicios para gestionar ordenes en el sistema*/
export class OrderService {

    constructor(private http: HttpClient) {}

    createOrder(data: any) {
        return this.http.post<any>(GLOBAL.http + GLOBAL.routeOrderRegister, data);
    }

    retryPayment(data: any) {
        return this.http.post<any>(GLOBAL.http + GLOBAL.routeRetryPayment, data);
    }

    listOrders() {
        return this.http.get<any>(GLOBAL.http + GLOBAL.routeListOrders);
    }

    getOrderDetail(orderId) {
        return this.http.get<any>(GLOBAL.http + GLOBAL.routeListOrderDetail + orderId);
    }

}
