import { ValidationMessage } from './../../../../Common/validation-message';
import {
  FormGroup
} from '@angular/forms';
import {
  Component,
  OnInit,
  Input,
  ChangeDetectorRef,
  OnChanges
} from '@angular/core';
import fieldsOptions from './category-fields-options';


@Component({
  // tslint:disable-next-line: component-selector
  selector: 'category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit, OnChanges {

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

  get fieldsOptions(): any {
    return fieldsOptions;
  }
}
