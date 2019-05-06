import { UserHttpService } from './../../../../services/http/user-http.service';
import {
  Component,
  OnInit,
  Output,
  ViewChild,
  EventEmitter
} from '@angular/core';
import {
  ModalComponent
} from 'src/app/components/bootstrap/modal/modal.component';
import {
  HttpErrorResponse
} from '@angular/common/http';
import { User } from 'src/app/model';


@Component({
// tslint:disable-next-line: component-selector
  selector: 'user-new-modal',
  templateUrl: './user-new-modal.component.html',
  styleUrls: ['./user-new-modal.component.css']
})
export class UserNewModalComponent implements OnInit {

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

  constructor(private userHttpService: UserHttpService) {}

  ngOnInit() {}


  showModal() {
    this.modal.show();
  }
  hideModal($event) {
    this.modal.hide();
  }

  submit() {
    this.userHttpService.create(this.user).subscribe(
      (user) => {
        this.onSuccess.emit(user);
        this.modal.hide();
      },
      (error) => {
        this.onError.emit(error);
      });
    return false;
  }
}
