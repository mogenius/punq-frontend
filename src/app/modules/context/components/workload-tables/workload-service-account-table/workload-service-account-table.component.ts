import { Component } from '@angular/core';
import { WorkloadTableBase } from '../workload-table-base';

@Component({
  selector: 'pq-workload-service-account-table',
  templateUrl: './workload-service-account-table.component.html',
  styleUrls: ['./workload-service-account-table.component.scss'],
})
export class WorkloadServiceAccountTableComponent extends WorkloadTableBase {}
