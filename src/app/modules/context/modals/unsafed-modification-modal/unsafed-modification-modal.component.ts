import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { WorkloadService } from '@pq/context/services/workload.service';

@Component({
  selector: 'pq-unsafed-modification-modal',
  templateUrl: './unsafed-modification-modal.component.html',
  styleUrls: ['./unsafed-modification-modal.component.scss'],
})
export class UnsafedModificationModalComponent {
  constructor(
    private readonly _ngbActiveModal: NgbActiveModal,
    private readonly _workloadService: WorkloadService
  ) {}

  public cancel(): void {
    this._ngbActiveModal.close(false);
  }

  public save(): void {
    this._workloadService.saveModifications().subscribe(() => {
      this._ngbActiveModal.close(true);
    });
  }

  public discard(): void {
    this._workloadService.unsafedModification$.next(null);
    this._ngbActiveModal.close(true);
  }
}
