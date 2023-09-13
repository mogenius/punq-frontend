import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { WorkloadService } from '@pq/context/services/workload.service';
import moment from 'moment';

@Component({
  template: '--- WORKLOAD TABLE ITEM BASE ---',
})
export class WorkloadTableItemBase {
  @Input() public workload: any = {};

  constructor(
    private readonly _workloadService: WorkloadService,
    private readonly _router: Router
  ) {}

  public deleteItem(): void {
    console.log('TODO delete');
  }

  public selectWorkload(): void {
    this._router.navigate([
      '/',
      'context',
      this._workloadService.selectedResource$.value,
      this.workload.metadata.name,
    ]);
  }

  public calcAge(date: string): string {
    return moment(date).fromNow(true);
  }
}
