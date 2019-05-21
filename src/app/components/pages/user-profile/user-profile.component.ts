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
  OnInit
} from '@angular/core';
import fieldsOptions from '../category/category-form/category-fields-options';
import {
  UserProfileHttpService
} from 'src/app/services/http/user-profile-http.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  errors = {};
  form: FormGroup;
  has_photo: boolean;
  constructor(
    private userProfileHttp: UserProfileHttpService,
    private formBuilder: FormBuilder,
    private notifyMessage: NotifyMessageService,
    public authService: AuthService
  ) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.maxLength(255)]],
      email: ['', [Validators.email, Validators.maxLength(255)]],
      password: ['', [Validators.minLength(6), Validators.maxLength(16)]],
      phone_number: null,
      photo: ''
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
}
