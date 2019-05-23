import {
  FirebaseAuthService
} from './../../../services/firebase-auth.service';
import {
  AuthService
} from './../../../services/auth.service';
import {
  NotifyMessageService
} from './../../../services/notify-message.service';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  UserProfileHttpService
} from 'src/app/services/http/user-profile-http.service';
import {
  PhoneNumberAuthModalComponent
} from '../../commom/phone-number-auth-modal/phone-number-auth-modal.component';
import fieldsOptions from './user-profile-field-options';

@Component({
// tslint:disable-next-line: component-selector
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  @ViewChild(PhoneNumberAuthModalComponent)
  phoneNumberAuthModal: PhoneNumberAuthModalComponent;

  errors = {};
  form: FormGroup;
  has_photo: boolean;


  constructor(
    private userProfileHttp: UserProfileHttpService,
    private formBuilder: FormBuilder,
    private notifyMessage: NotifyMessageService,
    public authService: AuthService,
    private firebaseAuth: FirebaseAuthService
  ) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(fieldsOptions.name.validationMessage.maxlength)]],
      email: ['', [Validators.email, Validators.maxLength(fieldsOptions.email.validationMessage.maxlength)]],
      password: ['', [Validators.minLength(
        fieldsOptions.password.validationMessage.minlength),
        Validators.maxLength(fieldsOptions.password.validationMessage.maxlength)]
      ],
      phone_number: null,
      photo: false,
      token: null
    });
    this.form.patchValue(authService.me);
    this.form.get('phone_number').setValue(this.authService.me.profile.phone_number);
    this.setHasPhoto();
  }

  ngOnInit() {}

  submit() {
    const data = Object.assign({}, this.form.value);
    delete data.phone_number;
    this.userProfileHttp.update(data).subscribe(
      (user) => {
        this.form.get('photo').setValue(false);
        this.form.get('token').setValue(null);
        this.setHasPhoto();
        this.notifyMessage.success('Perfil atualizado com sucesso');
      },
      (responseError) => {
        if (responseError.status === 422) {
          this.errors = responseError.error.errors;
        }
      });
    return false;
  }

  setHasPhoto() {
    this.has_photo = this.authService.me.profile.has_photo;
  }

  onChoosePhoto(files: FileList) {
    if (!files.length) {
      return;
    }

    this.form.get('photo').setValue(files[0]);
  }
  showErrors() {
    return Object.keys(this.errors).length !== 0;
  }

  removePhoto() {
    this.form.get('photo').setValue(null);
    this.has_photo = false;
  }

  openPhoneNumberAuthModal() {
    this.phoneNumberAuthModal.showModal();
  }

  onPhoneNumberVerification($event) {
    this.firebaseAuth.getUser().then(user => {
      this.form.get('phone_number').setValue(user.phoneNumber);
    });
    this.firebaseAuth.getToken().then(token => {
      this.form.get('token').setValue(token);
    });
  }

  get fieldsOptions(): any {
    return fieldsOptions;
  }
}
