import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  ProductOutput
} from 'src/app/model';
import {
  ProductoutputHttpService
} from 'src/app/services/http/product-output-http.service';
import {
  OutputInsertService
} from './output-insert.service';
import {
  ProductOutputNewModalComponent
} from '../product-output-new-modal/product-output-new-modal.component';

@Component({
  selector: 'app-product-output-list',
  templateUrl: './product-output-list.component.html',
  styleUrls: ['./product-output-list.component.css']
})
export class ProductOutputListComponent implements OnInit {

  outputs: ProductOutput[] = [];

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

  @ViewChild(ProductOutputNewModalComponent)
  outputNewModal: ProductOutputNewModalComponent;

  constructor(private outputHttp: ProductoutputHttpService, public outputService: OutputInsertService) {
    this.outputService.productOutputList = this;
  }

  ngOnInit() {
    this.getOutputs();
  }

  getOutputs() {
    this.outputHttp.list({
      page: this.pagination.page,
      sort: this.sortColumn.column === '' ? null : this.sortColumn,
      search: this.searchText
    }).subscribe(response => {
      this.outputs = response.data;
      this.pagination.totalItems = response.meta.total;
      this.pagination.itemsPerPage = response.meta.per_page;
    });
  }


  pageChanged(page) {
    this.pagination.page = page;
    this.getOutputs();
  }

  sort(sortColumn) {
    this.getOutputs();
  }

  search(search: string) {
    this.searchText = search;
    this.getOutputs();
  }

}
