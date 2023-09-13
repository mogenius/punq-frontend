import { Component } from '@angular/core';
import { WorkloadTableBase } from '../workload-table-base';

@Component({
  selector: 'pq-workload-issuer-table',
  templateUrl: './workload-issuer-table.component.html',
  styleUrls: ['./workload-issuer-table.component.scss'],
})
export class WorkloadIssuerTableComponent extends WorkloadTableBase {}
