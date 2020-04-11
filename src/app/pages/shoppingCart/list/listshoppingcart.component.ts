import {Component, OnInit, OnDestroy} from '@angular/core';
import {GLOBAL} from '../../../services/global';
import Swal from 'sweetalert2';
import {ShoppingCartService} from '../../../services/shoppingCart/shoppingCart.service';
import {AuthService} from '../../../services/auth/auth.service';
import {Router} from '@angular/router';
import {OrderService} from '../../../services/order/order.service';

@Component({
  selector: 'app-listshoppingcart',
  templateUrl: 'listshoppingcart.component.html'
})
export class ListshoppingcartComponent implements OnInit, OnDestroy {

  isCollapsed = true;
  dtOptions: DataTables.Settings = {};

  disableButton = false;
  shoppingCart: Array<any> = [];
  total: number;

  constructor(
      private shoppingCartService: ShoppingCartService,
      private authService: AuthService,
      private orderService: OrderService,
      private router: Router
  ) {
  }

  ngOnInit() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('profile-page');

    this.listProducts();
  }

  ngOnDestroy() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('profile-page');
  }

  listProducts() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: GLOBAL.limit,
      processing: true,
    };

    this.shoppingCart = (JSON.parse(localStorage.getItem('products')) ? JSON.parse(localStorage.getItem('products')) : []);
    this.total = this.shoppingCartService.getTotal();
  }

  clearShoppingCart() {
    this.shoppingCartService.clearShoppingCart();
    this.ngOnInit();
  }

  deleteProduct(id) {
    this.shoppingCartService.deleteProduct(id);
    this.ngOnInit();
  }

  pay() {
    if (!this.authService.isAutenticate()) {
      this.router.navigate(['/login']);
      return;
    }

    this.disableButton = true;
    const data = {
      products : this.shoppingCart
    };

    this.orderService.createOrder(data).subscribe((resp: any) => {
      this.disableButton = false;
      if (resp.success) {
        Swal.fire({
          type: 'success',
          title: 'Éxito',
          text: resp.message,
        });
        this.clearShoppingCart();
        window.open(resp.processUrl, '_blank');
        // this.router.navigate(['/listOrder']);
      }
    }, error => {
      this.disableButton = false;
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: error.error.message,
      });
    });

  }

}
