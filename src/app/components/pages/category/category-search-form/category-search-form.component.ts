import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'category-search-form',
  templateUrl: './category-search-form.component.html',
  styleUrls: ['./category-search-form.component.css']
})
export class CategorySearchFormComponent implements OnInit {

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
