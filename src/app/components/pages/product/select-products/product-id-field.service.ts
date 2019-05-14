import {
    Injectable,
    ElementRef
} from '@angular/core';
import {
    environment
} from 'src/environments/environment';
import {
    AbstractControl
} from '@angular/forms';
import {
    AuthService
} from 'src/app/services/auth.service';

declare const $;

@Injectable({
    providedIn: 'root'
})
export class ProductIdFieldService {

    data;
    select2Element: ElementRef;
    options: Select2Options;
    formControl: AbstractControl;

    constructor(private authService: AuthService) {

    }

    get divModal() {
        const modalElement = this.select2Native.closest('modal');
        return modalElement.firstChild;
    }

    get select2Native() {

        return this.select2Element.nativeElement;
    }

    make(select2Element: ElementRef, formControl: AbstractControl) {

        this.select2Element = select2Element;
        this.formControl = formControl;
        this.options = {
            dropdownParent: $(this.divModal),
            theme: 'bootstrap4',
            minimumInputLength: 4,
            placeholder: 'Selecione o produto',
            allowClear: true,
            ajax: {
                headers: {
                    'Authorization': this.authService.AuthorizationHeader
                },
                url: `${environment.api.url}/products`,
                data(params) {
                    return {
                        search: params.term
                    };
                },
                processResults(data) {
                    return {
                        results: data.data.map((product) => {
                            return {
                                id: product.id,
                                text: product.name
                            };
                        })
                    };
                }
            }
        };

        this.data = null;

        // force select2 reset
        setTimeout(() => {
            this.data = [];
        }, 300);
        this.onClosingDropdown();
        this.resetSelect2OnSetNull();
    }

    private onClosingDropdown() {

        $(this.select2Native).on('select2:closing', (e: Event) => {
            console.log('call');
            const element: HTMLInputElement = ( < any > e.target);
            this.formControl.markAsTouched();
            this.formControl.setValue(element.value);

        });
    }

    updateFormControl(value) {
        this.formControl.setValue(value);
    }

    private resetSelect2OnSetNull() {
        this.formControl.valueChanges.subscribe((value) => {
            if (!value) {
                const selectField = $(this.select2Native).find('select');
                selectField.val(null).trigger('change');
            }
        });
    }
}
