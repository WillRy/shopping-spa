import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import fieldsOptions from './chat-group-link-inv-field-options';


@Component({
// tslint:disable-next-line: component-selector
  selector: 'chat-group-link-inv-form',
  templateUrl: './chat-group-link-inv-form.component.html',
  styleUrls: ['./chat-group-link-inv-form.component.css']
})
export class ChatGroupLinkInvFormComponent implements OnInit {

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
