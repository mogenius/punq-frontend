import { Component } from '@angular/core';
import { WorkloadTableBase } from '../workload-table-base';

@Component({
  selector: 'pq-workload-resourcequotas-table',
  templateUrl: './workload-resourcequotas-table.component.html',
  styleUrls: ['./workload-resourcequotas-table.component.scss'],
})
export class WorkloadResourcequotasTableComponent extends WorkloadTableBase {}
