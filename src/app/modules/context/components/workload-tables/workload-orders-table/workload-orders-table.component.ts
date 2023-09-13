import { Component } from '@angular/core';
import { WorkloadTableBase } from '../workload-table-base';

@Component({
  selector: 'pq-workload-orders-table',
  templateUrl: './workload-orders-table.component.html',
  styleUrls: ['./workload-orders-table.component.scss'],
})
export class WorkloadOrdersTableComponent extends WorkloadTableBase {}
