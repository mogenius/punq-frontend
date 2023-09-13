import { Component } from '@angular/core';
import { WorkloadTableBase } from '../workload-table-base';

@Component({
  selector: 'pq-workload-crds-table',
  templateUrl: './workload-crds-table.component.html',
  styleUrls: ['./workload-crds-table.component.scss'],
})
export class WorkloadCrdsTableComponent extends WorkloadTableBase {}
