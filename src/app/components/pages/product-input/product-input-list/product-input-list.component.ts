import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  ProductInput
} from 'src/app/model';
import {
  ProductInputHttpService
} from 'src/app/services/http/product-input-http.service';
import {
  InputInsertService
} from './input-insert.service';
import {
  ProductInputNewModalComponent
} from '../product-input-new-modal/product-input-new-modal.component';

@Component({
  selector: 'app-product-input-list',
  templateUrl: './product-input-list.component.html',
  styleUrls: ['./product-input-list.component.css']
})
export class ProductInputListComponent implements OnInit {

  inputs: ProductInput[] = [];

  sortColumn = {
    column: 'created_at',
    sort: 'desc'
  };

  searchText: string;

  pagination = {
    page: 1,
    totalItems: 0,
    itemsPerPage: 5
  };

  @ViewChild(ProductInputNewModalComponent)
  inputNewModal: ProductInputNewModalComponent;

  constructor(
    private inputHttp: ProductInputHttpService,
    public inputService: InputInsertService
  ) {
    this.inputService.productInputList = this;
  }

  ngOnInit() {
    this.getInputs();
  }

  getInputs() {
    this.inputHttp.list({
      page: this.pagination.page,
      sort: this.sortColumn.column === '' ? null : this.sortColumn,
      search: this.searchText
    }).subscribe(response => {
      this.inputs = response.data;
      this.pagination.totalItems = response.meta.total;
      this.pagination.itemsPerPage = response.meta.per_page;
    });
  }

  pageChanged(page) {
    this.pagination.page = page;
    this.getInputs();
  }

  sort(sortColumn) {
    this.getInputs();
  }

  search(search: string) {
    this.searchText = search;
    this.getInputs();
  }

}
