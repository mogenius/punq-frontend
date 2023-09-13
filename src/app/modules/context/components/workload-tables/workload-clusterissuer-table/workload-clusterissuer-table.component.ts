import { Component } from '@angular/core';
import { WorkloadTableBase } from '../workload-table-base';

@Component({
  selector: 'pq-workload-clusterissuer-table',
  templateUrl: './workload-clusterissuer-table.component.html',
  styleUrls: ['./workload-clusterissuer-table.component.scss'],
})
export class WorkloadClusterissuerTableComponent extends WorkloadTableBase {}
