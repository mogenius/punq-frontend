import { Component } from '@angular/core';
import { WorkloadTableBase } from '../workload-table-base';

@Component({
  selector: 'pq-workload-ingress-table',
  templateUrl: './workload-ingress-table.component.html',
  styleUrls: ['./workload-ingress-table.component.scss'],
})
export class WorkloadIngressTableComponent extends WorkloadTableBase {}
