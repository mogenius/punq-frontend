import { Component } from '@angular/core';
import { WorkloadTableBase } from '../workload-table-base';

@Component({
  selector: 'pq-workload-leases-table',
  templateUrl: './workload-leases-table.component.html',
  styleUrls: ['./workload-leases-table.component.scss'],
})
export class WorkloadLeasesTableComponent extends WorkloadTableBase {}
