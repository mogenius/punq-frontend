import { Component } from '@angular/core';
import { WorkloadTableItemBase } from '../../workload-table-item-base';

@Component({
  selector: '[pq-workload-namespace-table-item]',
  templateUrl: './workload-namespace-table-item.component.html',
  styleUrls: ['./workload-namespace-table-item.component.scss'],
})
export class WorkloadNamespaceTableItemComponent extends WorkloadTableItemBase {}
