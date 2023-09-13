import { Component } from '@angular/core';
import { WorkloadTableItemBase } from '../../workload-table-item-base';

@Component({
  selector: '[pq-workload-resourcequotas-table-item]',
  templateUrl: './workload-resourcequotas-table-item.component.html',
  styleUrls: ['./workload-resourcequotas-table-item.component.scss'],
})
export class WorkloadResourcequotasTableItemComponent extends WorkloadTableItemBase {}
