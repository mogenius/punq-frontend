import { Component } from '@angular/core';
import { WorkloadTableItemBase } from '../../workload-table-item-base';

@Component({
  selector: '[pq-workload-service-table-item]',
  templateUrl: './workload-service-table-item.component.html',
  styleUrls: ['./workload-service-table-item.component.scss'],
})
export class WorkloadServiceTableItemComponent extends WorkloadTableItemBase {}
