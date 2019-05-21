import {
  ModalComponent
} from './../../bootstrap/modal/modal.component';
import {
  FirebaseAuthService
} from './../../../services/firebase-auth.service';
import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'phone-number-auth-modal',
  templateUrl: './phone-number-auth-modal.component.html',
  styleUrls: ['./phone-number-auth-modal.component.css']
})
export class PhoneNumberAuthModalComponent implements OnInit {

  @ViewChild(ModalComponent)
  modal: ModalComponent;

  // tslint:disable-next-line: no-output-on-prefix
  @Output()
  onSuccess: EventEmitter < any > = new EventEmitter < any > ();

  constructor(private firebaseAuth: FirebaseAuthService) {}

  unsubscribe;

  ngOnInit() {

  }

  showModal() {
    this.firebaseAuth.makePhoneNumberForm('#firebaseui');
    this.firebaseAuth.logout().then(() => {
      this.onAuthStateChanged();
    });

    this.modal.show();
  }

  onAuthStateChanged() {
    this.unsubscribe = this.firebaseAuth.firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.modal.hide();
        this.onSuccess.emit(user);
      }
    });
  }

  onHideModal() {
    this.unsubscribe();
  }



}
