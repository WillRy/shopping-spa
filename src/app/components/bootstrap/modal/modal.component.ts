import {
  Component,
  OnInit,
  ElementRef,
  EventEmitter,
  Output
} from '@angular/core';


declare const $;

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor(private element: ElementRef) {}

// tslint:disable-next-line: no-output-on-prefix
  @Output()
  onHide: EventEmitter < Event > = new EventEmitter < Event > ();

  ngOnInit() {
    const jqueryElement = this.getJqueryElement();
    jqueryElement.find('[modal-title]').addClass('modal-title');
    jqueryElement.find('[modal-body]').addClass('modal-body');
    jqueryElement.find('[modal-footer]').addClass('modal-footer');

    jqueryElement.on('hidden.bs.modal', (e) => {
      this.onHide.emit(e);
    });

  }

  show() {
    this.getJqueryElement().modal('show');
  }

  hide() {
    this.getJqueryElement().modal('hide');
  }

  private getJqueryElement() {
    const nativeElement = this.element.nativeElement;
    return $(nativeElement.firstChild);
  }
}
