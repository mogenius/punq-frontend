import { Component } from '@angular/core';
import { WorkloadTableItemBase } from '../../workload-table-item-base';

@Component({
  selector: '[pq-workload-endpoints-table-item]',
  templateUrl: './workload-endpoints-table-item.component.html',
  styleUrls: ['./workload-endpoints-table-item.component.scss'],
})
export class WorkloadEndpointsTableItemComponent extends WorkloadTableItemBase {}
