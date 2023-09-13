import { Component } from '@angular/core';
import { WorkloadTableBase } from '../workload-table-base';

@Component({
  selector: 'pq-workload-node-table',
  templateUrl: './workload-node-table.component.html',
  styleUrls: ['./workload-node-table.component.scss'],
})
export class WorkloadNodeTableComponent extends WorkloadTableBase {}
