import { Component } from '@angular/core';
import { WorkloadTableBase } from '../workload-table-base';

@Component({
  selector: 'pq-workload-daemon-set-table',
  templateUrl: './workload-daemon-set-table.component.html',
  styleUrls: ['./workload-daemon-set-table.component.scss'],
})
export class WorkloadDaemonSetTableComponent extends WorkloadTableBase {}
