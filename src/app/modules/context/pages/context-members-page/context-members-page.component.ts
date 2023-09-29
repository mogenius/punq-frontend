import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddUserModalComponent } from '@pq/context/modals/add-user-modal/add-user-modal.component';

@Component({
  selector: 'pq-context-members-page',
  templateUrl: './context-members-page.component.html',
  styleUrls: ['./context-members-page.component.scss'],
})
export class ContextMembersPageComponent {
  constructor(private readonly _ngbModal: NgbModal) {}
  public addUser(): void {
    const modal = this._ngbModal.open(AddUserModalComponent, {
      size: 'md',
    });

    modal.result.then(
      (result) => {
        console.log(result);
      },
      (reason) => {
        console.log(reason);
      }
    );
  }
}
