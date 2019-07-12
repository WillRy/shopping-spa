import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { FormGroup, Form } from '@angular/forms';
import { Order } from 'src/app/model';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {

  @Input()
  order: Order;

  @Input()
  form: FormGroup;

  constructor(private changeRef: ChangeDetectorRef) {}

  ngOnInit() {}

  // usado para ativar mudanças no componente, repassando as mudanças do formulario,
  // para o form builder do elemento pai.
  // tslint:disable-next-line: use-life-cycle-interface
  ngOnChanges() {
    this.changeRef.detectChanges();
  }



}
