import { Component } from '@angular/core';
import { WorkloadTableBase } from '../workload-table-base';

@Component({
  selector: 'pq-workload-event-table',
  templateUrl: './workload-event-table.component.html',
  styleUrls: ['./workload-event-table.component.scss'],
})
export class WorkloadEventTableComponent extends WorkloadTableBase {}
