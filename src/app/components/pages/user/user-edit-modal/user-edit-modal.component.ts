import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  Input
} from '@angular/core';
import {
  HttpErrorResponse
} from '@angular/common/http';
import {
  ModalComponent
} from 'src/app/components/bootstrap/modal/modal.component';
import { User } from 'src/app/model';
import { UserHttpService } from 'src/app/services/http/user-http.service';

@Component({
// tslint:disable-next-line: component-selector
  selector: 'user-edit-modal',
  templateUrl: './user-edit-modal.component.html',
  styleUrls: ['./user-edit-modal.component.css']
})
export class UserEditModalComponent implements OnInit {
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onSuccess: EventEmitter < any > = new EventEmitter < any > ();
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onError: EventEmitter < HttpErrorResponse > = new EventEmitter < HttpErrorResponse > ();

  @ViewChild(ModalComponent)
  modal: ModalComponent;

  user: User = {
    name: '',
    email: '',
    password: ''
  };

  _userId: number;

  constructor(private userHttp: UserHttpService) {}

  ngOnInit() {}

  @Input()
  set userId(value) {
    this._userId = value;
    if (this._userId) {
      this.userHttp.get(this._userId).subscribe(response => this.user = response);
    }
  }

  submit() {
    this.userHttp.update(this._userId, this.user).subscribe(
      (user) => {
        this.onSuccess.emit(user);
        this.modal.hide();
      },
      (error) => {
        this.onError.emit(error);
      });
  }

  showModal() {
    this.modal.show();
  }
  hideModal($event) {
    this.modal.hide();
  }
}
