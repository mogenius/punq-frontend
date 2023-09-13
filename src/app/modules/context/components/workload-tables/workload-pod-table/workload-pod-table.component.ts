import { Component } from '@angular/core';
import { WorkloadTableBase } from '../workload-table-base';

@Component({
  selector: 'pq-workload-pod-table',
  templateUrl: './workload-pod-table.component.html',
  styleUrls: ['./workload-pod-table.component.scss'],
})
export class WorkloadPodTableComponent extends WorkloadTableBase {}
