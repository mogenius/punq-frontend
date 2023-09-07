import { Component, Input } from '@angular/core';

@Component({
  selector: 'pq-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() state:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'danger'
    | 'success'
    | 'warning'
    | 'transparent'
    | 'cta' = 'primary';
  @Input() additionalClasses: string[] = [];
  @Input() disabled = false;

  get buttonClassList(): string {
    return `btn btn-${this.state} ${this.additionalClasses.join(' ')}`;
  }
}
