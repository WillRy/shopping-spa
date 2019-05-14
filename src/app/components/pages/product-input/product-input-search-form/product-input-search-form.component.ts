import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
// tslint:disable-next-line: component-selector
  selector: 'product-input-search-form',
  templateUrl: './product-input-search-form.component.html',
  styleUrls: ['./product-input-search-form.component.css']
})
export class ProductInputSearchFormComponent implements OnInit {

  search = '';

  // tslint:disable-next-line: no-output-on-prefix
  @Output()
  onSearch: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  submit() {
    this.onSearch.emit(this.search);
  }

}
