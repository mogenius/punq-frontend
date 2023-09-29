import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'pq-base-modal',
  templateUrl: './base-modal.component.html',
  styleUrls: ['./base-modal.component.scss'],
})
export class BaseModalComponent {
  @Input() modalTitle: string = '';
  @Input() modalSubTitle: string = '';
  @Input() cancelHandler!: () => void;

  constructor(protected _activeModal: NgbActiveModal) {}

  public cancel(): void {
    this._activeModal.dismiss();

    if (this.cancelHandler) {
      this.cancelHandler();
    }
  }
}
