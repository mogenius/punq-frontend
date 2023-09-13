import { Component } from '@angular/core';
import { WorkloadTableBase } from '../workload-table-base';

@Component({
  selector: 'pq-workload-priorityclasses-table',
  templateUrl: './workload-priorityclasses-table.component.html',
  styleUrls: ['./workload-priorityclasses-table.component.scss'],
})
export class WorkloadPriorityclassesTableComponent extends WorkloadTableBase {}
