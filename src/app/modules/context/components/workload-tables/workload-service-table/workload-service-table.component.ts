import { Component } from '@angular/core';
import { WorkloadTableBase } from '../workload-table-base';

@Component({
  selector: 'pq-workload-service-table',
  templateUrl: './workload-service-table.component.html',
  styleUrls: ['./workload-service-table.component.scss'],
})
export class WorkloadServiceTableComponent extends WorkloadTableBase {}
