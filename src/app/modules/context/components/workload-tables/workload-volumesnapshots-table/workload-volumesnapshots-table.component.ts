import { Component } from '@angular/core';
import { WorkloadTableBase } from '../workload-table-base';

@Component({
  selector: 'pq-workload-volumesnapshots-table',
  templateUrl: './workload-volumesnapshots-table.component.html',
  styleUrls: ['./workload-volumesnapshots-table.component.scss'],
})
export class WorkloadVolumesnapshotsTableComponent extends WorkloadTableBase {}
