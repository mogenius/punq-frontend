import { Component } from '@angular/core';
import { WorkloadTableBase } from '../workload-table-base';

@Component({
  selector: 'pq-workload-endpoints-table',
  templateUrl: './workload-endpoints-table.component.html',
  styleUrls: ['./workload-endpoints-table.component.scss'],
})
export class WorkloadEndpointsTableComponent extends WorkloadTableBase {}
