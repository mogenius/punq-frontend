import { Component } from '@angular/core';
import { WorkloadTableItemBase } from '../../workload-table-item-base';

@Component({
  selector: '[pq-workload-persistent-volume-table-item]',
  templateUrl: './workload-persistent-volume-table-item.component.html',
  styleUrls: ['./workload-persistent-volume-table-item.component.scss'],
})
export class WorkloadPersistentVolumeTableItemComponent extends WorkloadTableItemBase {}
