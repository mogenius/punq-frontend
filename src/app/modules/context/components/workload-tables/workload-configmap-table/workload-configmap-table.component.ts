import { Component } from '@angular/core';
import { WorkloadTableBase } from '../workload-table-base';

@Component({
  selector: 'pq-workload-configmap-table',
  templateUrl: './workload-configmap-table.component.html',
  styleUrls: ['./workload-configmap-table.component.scss'],
})
export class WorkloadConfigmapTableComponent extends WorkloadTableBase {}
