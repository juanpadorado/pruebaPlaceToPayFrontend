import { HttpClient, HttpHeaders } from '@angular/common/http';
import {GLOBAL} from '../global';
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class ShoppingCartService {
    private jsonProducts: any;
    private itemsShoppingCart: [] = [];

    constructor(private http: HttpClient) {}

    /**
     * addToCart
     */
    addToCart(product: any) {
        this.jsonProducts = JSON.parse(localStorage.getItem('products'));
        if (this.jsonProducts) {
            this.jsonProducts.push(product);
        } else {
            this.jsonProducts = [product];
        }

        localStorage.setItem('products', JSON.stringify(this.jsonProducts));
    }

    /**
     * clearShoppingCart
     */
    clearShoppingCart() {
        localStorage.removeItem('products');
    }

    /**
     * getTotal
     */
    getTotal() {
        this.itemsShoppingCart = JSON.parse(localStorage.getItem('products'));
        if (this.itemsShoppingCart) {
            return this.itemsShoppingCart.reduce((total, product: any) => {
                return total + product.price;
            }, 0);
        } else {
            return 0;
        }
    }

    /**
     * deleteProduct
     */
    deleteProduct(id) {
        this.jsonProducts = JSON.parse(localStorage.getItem('products'));
        this.jsonProducts.splice(id, 1);

        localStorage.setItem('products', JSON.stringify(this.jsonProducts));
    }
}
