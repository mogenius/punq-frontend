import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { nanoid } from 'nanoid';

//! CONSTRUCTOR -> super() needs to be called when using this!

@Directive()
export abstract class InputBase implements OnInit, AfterViewInit {
  @ViewChild('input') input: ElementRef;

  @Input() control: FormControl = new FormControl({
    value: '',
    disabled: false,
  });
  @Input() label: string;
  @Input() autocomplete: boolean = false;
  @Input() floating: boolean = true;
  @Input() focus: boolean = false;
  @Input() hideError: boolean = false;
  @Input() info: string;
  @Input() loading: string;
  @Input() highlightMessage: string;
  @Input() highlight: boolean;

  @Output() blur: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();

  private _id: string;

  ngOnInit(): void {
    this._id = nanoid();
  }

  ngAfterViewInit(): void {
    if (this.focus) {
      this.input?.nativeElement.focus();
    }
  }

  get id(): string {
    return this._id;
  }
}
