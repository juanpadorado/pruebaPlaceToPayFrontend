import { HttpClient, HttpHeaders } from '@angular/common/http';
import {GLOBAL} from "../global";
import {Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class ProductService {

    constructor(private http: HttpClient) {}

    listProducts() {
        return this.http.get<any>(GLOBAL.http + GLOBAL.routeListProducts);
    }

}
