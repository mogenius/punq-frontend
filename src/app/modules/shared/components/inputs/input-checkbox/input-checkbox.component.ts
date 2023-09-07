import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'pq-input-checkbox',
  templateUrl: './input-checkbox.component.html',
  styleUrls: ['./input-checkbox.component.scss'],
})
export class InputCheckboxComponent {
  @Input() control: FormControl = new FormControl({
    value: false,
    disabled: false,
  });

  public id = Math.random().toString(36).substring(2);
}
