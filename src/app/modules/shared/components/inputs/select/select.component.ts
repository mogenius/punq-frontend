import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'pq-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent {
  @Input() control: FormControl = new FormControl({
    value: undefined,
    disabled: false,
  });
  @Input() label!: string;
  @Input() floating: boolean = true;
  @Input() items!: string[] | any[];
  @Input() clearable: boolean = false;
  @Input() searchable: boolean = false;
  @Input() translate: boolean = false;
  @Input() bindLabel: string | null = null;
  @Input() bindValue: string | null = null;
  @Input() inline: boolean = false;
  @Input() position: string = 'bottom auto';

  get required(): boolean {
    return this.control.validator
      ? this.control.validator(new FormControl())?.required
      : false;
  }
}
