import { Component, OnInit, Output, EventEmitter, ViewChild, Input } from '@angular/core';
import { User } from 'src/app/model';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalComponent } from 'src/app/components/bootstrap/modal/modal.component';
import { ProductHttpService } from 'src/app/services/http/product-http.service';
import { UserHttpService } from 'src/app/services/http/user-http.service';

@Component({
// tslint:disable-next-line: component-selector
  selector: 'user-delete-modal',
  templateUrl: './user-delete-modal.component.html',
  styleUrls: ['./user-delete-modal.component.css']
})
export class UserDeleteModalComponent implements OnInit {

  user: User = null;

  _userId: number;

  // tslint:disable-next-line: no-output-on-prefix
  @Output() onSuccess: EventEmitter < any > = new EventEmitter < any > ();
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onError: EventEmitter < HttpErrorResponse > = new EventEmitter < HttpErrorResponse > ();

  @ViewChild(ModalComponent)
  modal: ModalComponent;

  constructor(private userHttp: UserHttpService) {}

  ngOnInit() {
  }

  @Input()
  set userId(value) {
    this._userId = value;
    if (this._userId) {
      this.userHttp.get(this._userId).subscribe(response => this.user = response);
    }
  }

  showModal() {
    this.modal.show();
  }

  hideModal($event) {
    this.modal.hide();
  }

  destroy() {
    this.userHttp.destroy(this._userId)
      .subscribe(
        (user) => {
          this.onSuccess.emit(user);
          this.modal.hide();

        },
        error => {
          this.onError.emit(error);
        });
    return false;
  }
}
