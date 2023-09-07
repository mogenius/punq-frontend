import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { filter, startWith, take } from 'rxjs/operators';
import { BaseSubscription } from './base-subscription';

@Component({
  selector: 'mo-base-form',
  template: '<div>-- BASE-FORM --</div>',
})
export class BaseForm<SUCCESS = boolean, CANCEL = boolean, DELETE = boolean>
  extends BaseSubscription
  implements OnDestroy
{
  @Output() success: EventEmitter<SUCCESS> = new EventEmitter<SUCCESS>();
  @Output() cancel: EventEmitter<CANCEL> = new EventEmitter<CANCEL>();
  @Output() delete: EventEmitter<DELETE> = new EventEmitter<DELETE>();

  protected _submitLoading = false;
  protected _form!: FormGroup;
  protected _isDisabled = false;
  protected _isSubmit = false;

  protected async updateValueAndValidity(value: FormGroup): Promise<any> {
    for (const key in value.controls) {
      if (!value.controls.hasOwnProperty(key)) {
        continue;
      }
      const control = value.controls[key];
      if (control instanceof FormControl) {
        control.markAsDirty();
        control.markAsTouched();
        // control.clearAsyncValidators();
        control.updateValueAndValidity();

        await this._form.statusChanges
          .pipe(
            startWith(this.form.status),
            filter((status: string) => status !== 'PENDING'),
            take(1)
          )
          .toPromise();
      } else if (control instanceof FormArray) {
        (control.controls as FormGroup[]).map(async (item: FormGroup) => {
          await this.updateValueAndValidity(item);
        });
      } else if (control instanceof FormGroup) {
        await this.updateValueAndValidity(control);
      }
    }
  }

  get form(): FormGroup {
    return this._form;
  }

  get isDisabled(): boolean {
    return this._isDisabled;
  }

  get isSubmit(): boolean {
    return this._isSubmit;
  }

  get submitLoading(): boolean {
    return this._submitLoading;
  }
}
