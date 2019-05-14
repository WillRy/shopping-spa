import {
  Directive,
  ElementRef,
  Input
} from '@angular/core';
import {
  NgControl
} from '@angular/forms';
import {
  element
} from '@angular/core/src/render3/instructions';


@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[isInvalid]'
})
export class IsInvalidDirective {

// tslint:disable-next-line: no-shadowed-variable
  constructor(private element: ElementRef, private control: NgControl) {}

  // tslint:disable-next-line: use-life-cycle-interface
  ngOnInit() {
    toogleClassInvalid(this.control, this.element.nativeElement);
  }
}

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[isInvalidControl]'
})
export class IsInvalidControlDirective {

  control: NgControl;

// tslint:disable-next-line: no-shadowed-variable
  constructor(private element: ElementRef) {}

  // tslint:disable-next-line: use-life-cycle-interface
  ngOnInit() {
   toogleClassInvalid(this.control, this.element.nativeElement);
  }

  @Input()
  set isInvalidControl(value) {
    this.control = value;
  }

}
function toogleClassInvalid(control: NgControl, nativeElement: HTMLElement) {
  control.valueChanges.subscribe(() => {
    if (control.invalid && (control.dirty || control.touched)) {
      if (!nativeElement.classList.contains('is-invalid')) {
        nativeElement.classList.add('is-invalid');
      }
    } else {
      nativeElement.classList.remove('is-invalid');
    }
  });
}
