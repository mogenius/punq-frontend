import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import YAML from 'yaml';

@Component({
  selector: '[pq-context-connect-list-item]',
  templateUrl: './context-connect-list-item.component.html',
  styleUrls: ['./context-connect-list-item.component.scss'],
})
export class ContextConnectListItemComponent implements OnInit {
  @Input() context: any;
  @Output() disable: EventEmitter<any> = new EventEmitter<any>();

  private _disableFormControl = new FormControl({
    value: true,
    disabled: false,
  });

  private _contextObject: any;

  constructor() {}

  ngOnInit(): void {
    this._contextObject = YAML.parse(this.context.context);

    this._disableFormControl.valueChanges.subscribe((value) => {
      this.disable.emit(value);
    });
  }

  get contextObject(): any {
    return this._contextObject;
  }

  get disableFormControl(): FormControl {
    return this._disableFormControl;
  }
}
