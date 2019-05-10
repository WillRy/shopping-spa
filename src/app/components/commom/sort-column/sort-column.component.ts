import {
  Component,
  OnInit,
  Input,
  HostListener,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: '[sortColumn]',
  templateUrl: './sort-column.component.html',
  styleUrls: ['./sort-column.component.css']
})
export class SortColumnComponent implements OnInit {

// tslint:disable-next-line: no-output-on-prefix
  @Output()
  onSort: EventEmitter<any> = new EventEmitter<any>();

  @Input()
  sortColumn: {
    column: string,
    sort: string
  };

  @Input()
  columnName: string;

  constructor() {}

  ngOnInit() {}

  @HostListener('click')
  changeSort() {
    this.sortColumn.column = this.columnName;
    this.sortColumn.sort = this.sortColumn.sort === 'desc' ? 'asc' : 'desc';
    this.onSort.emit(this.sortColumn);
  }

  showArrowDown() {
    return this.columnName === this.sortColumn.column && this.sortColumn.sort === 'desc';
  }

  showArrowUp() {
    return this.columnName === this.sortColumn.column && this.sortColumn.sort === 'asc';
  }

}
