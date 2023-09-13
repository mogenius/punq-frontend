import { Component } from '@angular/core';
import { WorkloadTableBase } from '../workload-table-base';

@Component({
  selector: 'pq-workload-storageclass-table',
  templateUrl: './workload-storageclass-table.component.html',
  styleUrls: ['./workload-storageclass-table.component.scss'],
})
export class WorkloadStorageclassTableComponent extends WorkloadTableBase {}
