import { Component, OnInit, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';
import {GLOBAL} from '../../../services/global';
import {Subject} from 'rxjs';
import {DataTableDirective} from 'angular-datatables';
import {OrderService} from '../../../services/order/order.service';

@Component({
  selector: 'app-listorder',
  templateUrl: 'listorder.component.html'
})
export class ListorderComponent implements OnInit, OnDestroy {

  isCollapsed = true;
  dtOptions: DataTables.Settings = {};
  orders: any = [];
  dtTrigger: Subject<any> = new Subject();
  dtElement: DataTableDirective;
  isDtInitialized = false;
  idOrder: number;
  orderDetail: any = [];
  toOrder = 0;

  constructor(
      private orderService: OrderService,
  ) {
    this.listOrders();
  }

  ngOnInit() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('profile-page');
  }
  ngOnDestroy() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('profile-page');
    this.dtTrigger.unsubscribe();
  }

  listOrders() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: GLOBAL.limit,
      processing: true,
      order: [[ 0, 'desc' ]]
    };

    this.orderService.listOrders().subscribe((resp: any) => {
      if (resp.success) {
        this.orders = resp.orders;

        if (this.isDtInitialized) {
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
            this.dtTrigger.next();
          });
        } else {
          this.isDtInitialized = true;
          this.dtTrigger.next();
        }
      }
    }, error => {
      console.log(error);
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: error.error.message,
      });
    });
  }

  openModal(orderId) {
    this.toOrder = 0;
    this.orderService.getOrderDetail(orderId).subscribe((resp: any) => {
      if (resp.success) {
        this.idOrder = orderId;
        this.orderDetail = resp.products;

        resp.products.map(product => {
          this.toOrder = this.toOrder + product.price;
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

}
