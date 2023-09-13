import { Component } from '@angular/core';
import { WorkloadTableBase } from '../workload-table-base';

@Component({
  selector: 'pq-workload-persistent-volume-table',
  templateUrl: './workload-persistent-volume-table.component.html',
  styleUrls: ['./workload-persistent-volume-table.component.scss'],
})
export class WorkloadPersistentVolumeTableComponent extends WorkloadTableBase {}
