import { Component } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'pq-add-user-modal',
  templateUrl: './add-user-modal.component.html',
  styleUrls: ['./add-user-modal.component.scss'],
})
export class AddUserModalComponent {
  constructor(private readonly _ngbActiveModal: NgbActiveModal) {}
  public cancel(): void {
    this._ngbActiveModal.dismiss();
  }
}
