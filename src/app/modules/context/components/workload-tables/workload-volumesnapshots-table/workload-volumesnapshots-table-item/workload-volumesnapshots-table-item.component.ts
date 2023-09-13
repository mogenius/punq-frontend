import { Component } from '@angular/core';
import { WorkloadTableItemBase } from '../../workload-table-item-base';

@Component({
  selector: '[pq-workload-volumesnapshots-table-item]',
  templateUrl: './workload-volumesnapshots-table-item.component.html',
  styleUrls: ['./workload-volumesnapshots-table-item.component.scss'],
})
export class WorkloadVolumesnapshotsTableItemComponent extends WorkloadTableItemBase {}
