import { Component } from '@angular/core';
import { WorkloadTableItemBase } from '../../workload-table-item-base';

@Component({
  selector: '[pq-workload-configmap-table-item]',
  templateUrl: './workload-configmap-table-item.component.html',
  styleUrls: ['./workload-configmap-table-item.component.scss'],
})
export class WorkloadConfigmapTableItemComponent extends WorkloadTableItemBase {}
