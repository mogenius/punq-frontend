import { Component } from '@angular/core';
import { WorkloadTableBase } from '../workload-table-base';

@Component({
  selector: 'pq-workload-ingress-classes-table',
  templateUrl: './workload-ingress-classes-table.component.html',
  styleUrls: ['./workload-ingress-classes-table.component.scss'],
})
export class WorkloadIngressClassesTableComponent extends WorkloadTableBase {}
