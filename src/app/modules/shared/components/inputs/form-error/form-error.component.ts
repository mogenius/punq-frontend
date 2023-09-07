import { Component, Input } from '@angular/core';
import { Form, FormControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'pq-form-error',
  templateUrl: './form-error.component.html',
  styleUrls: ['./form-error.component.scss'],
})
export class FormErrorComponent {
  @Input('control') control: FormControl;

  get errors(): ValidationErrors | null {
    return this.control.errors;
  }
}
