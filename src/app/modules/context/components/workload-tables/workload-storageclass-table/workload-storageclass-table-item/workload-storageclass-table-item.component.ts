import { Component } from '@angular/core';
import { WorkloadTableItemBase } from '../../workload-table-item-base';

@Component({
  selector: '[pq-workload-storageclass-table-item]',
  templateUrl: './workload-storageclass-table-item.component.html',
  styleUrls: ['./workload-storageclass-table-item.component.scss'],
})
export class WorkloadStorageclassTableItemComponent extends WorkloadTableItemBase {}
