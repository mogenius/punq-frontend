import { Component, Input } from '@angular/core';
import { startWith, pairwise, filter, map } from 'rxjs';
import { InputBase } from '../input-base';

@Component({
  selector: 'pq-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent extends InputBase {
  @Input() type: string = 'text';
  @Input() copyable: boolean = false;

  constructor() {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();
    if (this.type === 'number') {
      this.control.valueChanges
        .pipe(
          startWith(this.control.value),
          pairwise(),
          filter(([prev, next]) => prev !== next),
          map(([prev, next]) => next)
        )
        .subscribe((val) => {
          this.control.setValue(val.replace(/[^0-9]*/g, ''));
        });
    }
  }
}
