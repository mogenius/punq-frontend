import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, from, of } from 'rxjs';
import { WorkloadService } from '../services/workload.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UnsafedModificationModalComponent } from '../modals/unsafed-modification-modal/unsafed-modification-modal.component';

@Injectable({
  providedIn: 'root',
})
export class LeaveDetailsGuard {
  constructor(
    private readonly _workloadService: WorkloadService,
    private readonly _ngbModal: NgbModal
  ) {}

  canDeactivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    if (!!this._workloadService.unsafedModification$.value) {
      // handle unsafed modification modal
      return from(
        new Promise<boolean>((resolve, reject) => {
          const modal = this._ngbModal.open(UnsafedModificationModalComponent, {
            size: 'md',
          });

          modal.result.then((res) => {
            return resolve(res);
          });

          modal.dismissed.subscribe(() => {
            return resolve(false);
          });
        })
      );
    } else {
      return of(true);
    }
  }
}
