import { ProductIdFieldService } from './product-id-field.service';
import { Component, OnInit, Input, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import fieldsOptions from './input-fields-options';
import { Select2Component } from 'ng2-select2';

@Component({
// tslint:disable-next-line: component-selector
  selector: 'product-input-form',
  templateUrl: './product-input-form.component.html',
  styleUrls: ['./product-input-form.component.css']
})
export class ProductInputFormComponent implements OnInit {

  @Input()
  form: FormGroup;

  data = [
    {
      id: '1', text: 'Laravel'
    },
    {
      id: '2', text: 'Laravel'
    }
  ];

  @ViewChild(Select2Component, {read: ElementRef})
  select2Element: ElementRef;

  constructor(
    private changeRef: ChangeDetectorRef,
    public productIdField: ProductIdFieldService
    ) {
    }

  ngOnInit() {
    this.productIdField.make(this.select2Element, this.form.get('product_id'));
  }

  // usado para ativar mudanças no componente, repassando as mudanças do formulario,
  // para o form builder do elemento pai.
  // tslint:disable-next-line: use-life-cycle-interface
  ngOnChanges() {
    this.changeRef.detectChanges();
  }

  get fieldsOptions(): any {
    return fieldsOptions;
  }

}
