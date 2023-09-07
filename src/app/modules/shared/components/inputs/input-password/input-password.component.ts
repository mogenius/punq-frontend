import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { InputBase } from '../input-base';

@Component({
  selector: 'pq-input-password',
  templateUrl: './input-password.component.html',
  styleUrls: ['./input-password.component.scss'],
})
export class InputPasswordComponent extends InputBase {
  private _passwordClear: boolean = false;

  public toggleView(): void {
    this._passwordClear = !this._passwordClear;
  }

  get passwordClear(): boolean {
    return this._passwordClear;
  }

  get required(): boolean {
    return this.control.validator
      ? this.control.validator(new FormControl())?.required
      : false;
  }
}
