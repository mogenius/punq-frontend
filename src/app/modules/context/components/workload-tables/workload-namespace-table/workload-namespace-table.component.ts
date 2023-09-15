import { Component } from '@angular/core';
import { WorkloadTableBase } from '../workload-table-base';

@Component({
  selector: 'pq-workload-namespace-table',
  templateUrl: './workload-namespace-table.component.html',
  styleUrls: ['./workload-namespace-table.component.scss'],
})
export class WorkloadNamespaceTableComponent extends WorkloadTableBase {}
