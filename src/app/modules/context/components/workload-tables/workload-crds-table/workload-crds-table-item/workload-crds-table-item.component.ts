import { Component } from '@angular/core';
import { WorkloadTableItemBase } from '../../workload-table-item-base';

@Component({
  selector: '[pq-workload-crds-table-item]',
  templateUrl: './workload-crds-table-item.component.html',
  styleUrls: ['./workload-crds-table-item.component.scss'],
})
export class WorkloadCrdsTableItemComponent extends WorkloadTableItemBase {}
