import { Component } from '@angular/core';
import { WorkloadTableItemBase } from '../../workload-table-item-base';

@Component({
  selector: '[pq-workload-ingress-table-item]',
  templateUrl: './workload-ingress-table-item.component.html',
  styleUrls: ['./workload-ingress-table-item.component.scss'],
})
export class WorkloadIngressTableItemComponent extends WorkloadTableItemBase {}
