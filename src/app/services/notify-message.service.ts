import {
  Injectable
} from '@angular/core';
import PNotify from 'pnotify/dist/es/PNotify';
import PNotifyButtons from 'pnotify/dist/es/PNotifyButtons';
import PnotifyMobile from 'pnotify/dist/es/PNotifyMobile';


@Injectable({
  providedIn: 'root'
})
export class NotifyMessageService {

  constructor() {

  }

  success(text: string) {
    // tslint:disable-next-line: no-use-before-declare
    this.alert(text, Types.success);
  }

  error(text: string) {
    // tslint:disable-next-line: no-use-before-declare
    this.alert(text, Types.error);
  }

  private alert(text: string, type: Types) {
    this.pnotify.alert({
      text: text,
      type: type
    });
  }

  private get pnotify() {
    // tslint:disable-next-line: no-unused-expression
    PnotifyMobile;
    // tslint:disable-next-line: no-unused-expression
    PNotifyButtons;

    PNotify.defaults.modules = {
      Mobile: {
        swipeDismiss: true,
        styling: true
      }
    };
    return PNotify;
  }

}
enum Types {
  success = 'success',
    error = 'error'
}
