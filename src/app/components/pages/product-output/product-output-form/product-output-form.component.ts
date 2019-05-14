import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  ChangeDetectorRef
} from '@angular/core';
import {
  FormGroup
} from '@angular/forms';
import {
  Select2Component
} from 'ng2-select2';
import {
  ProductIdFieldService
} from '../../product-input/product-input-form/product-id-field.service';
import fieldsOptions from './output-fields-options';


@Component({
  // tslint:disable-next-line: component-selector
  selector: 'product-output-form',
  templateUrl: './product-output-form.component.html',
  styleUrls: ['./product-output-form.component.css']
})
export class ProductOutputFormComponent implements OnInit {

  @Input()
  form: FormGroup;



  @ViewChild(Select2Component, {
    read: ElementRef
  })
  select2Element: ElementRef;

  constructor(
    private changeRef: ChangeDetectorRef,
    public productIdField: ProductIdFieldService
  ) {}

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
