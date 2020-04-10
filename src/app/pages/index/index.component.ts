import { Component, OnInit, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';
import {ProductService} from '../../services/product/product.service';
import {ShoppingCartService} from '../../services/shoppingCart/shoppingCart.service';

@Component({
  selector: 'app-index',
  templateUrl: 'index.component.html'
})
export class IndexComponent implements OnInit, OnDestroy {
  isCollapsed = true;
  focus;
  focus1;
  focus2;
  date = new Date();
  pagination = 3;
  pagination1 = 1;
  products: any = [];

  constructor(
      private productService: ProductService,
      private shoppingCartService: ShoppingCartService,
  ) {}

  ngOnInit() {
    let body = document.getElementsByTagName('body')[0];
    body.classList.add('index-page');

    this.listProducts();
  }
  ngOnDestroy() {
    let body = document.getElementsByTagName('body')[0];
    body.classList.remove('index-page');
  }

  listProducts() {
    this.productService.listProducts().subscribe((resp: any) => {
      if (resp.success) {
        this.products = resp.products;

      }
    }, error => {
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: error.error.message,
      });
    });
  }

  addProduct(product: any) {
    this.shoppingCartService.addToCart(product);
    Swal.fire({
      type: 'success',
      title: 'Exito',
      text: 'Se ha agregado el producto correctamente',
    });
  }

}
