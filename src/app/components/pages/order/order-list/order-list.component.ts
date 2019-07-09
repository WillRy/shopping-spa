import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/model';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  orders: Array < Order > = [];

  orderId: number;



  pagination = {
    page: 1,
    totalItems: 0,
    itemsPerPage: 5
  };

  constructor() { }

  ngOnInit() {
  }

}
