import { Component } from '@angular/core';
import { WorkloadTableBase } from '../workload-table-base';

@Component({
  selector: 'pq-workload-deployment-table',
  templateUrl: './workload-deployment-table.component.html',
  styleUrls: ['./workload-deployment-table.component.scss'],
})
export class WorkloadDeploymentTableComponent extends WorkloadTableBase {}
