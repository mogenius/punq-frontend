import { Component } from '@angular/core';
import { WorkloadTableBase } from '../workload-table-base';

@Component({
  selector: 'pq-workload-persistent-volume-claim-table',
  templateUrl: './workload-persistent-volume-claim-table.component.html',
  styleUrls: ['./workload-persistent-volume-claim-table.component.scss'],
})
export class WorkloadPersistentVolumeClaimTableComponent extends WorkloadTableBase {}
