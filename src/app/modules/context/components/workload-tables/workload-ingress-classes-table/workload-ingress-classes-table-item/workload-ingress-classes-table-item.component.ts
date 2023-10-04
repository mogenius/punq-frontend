import { Component } from '@angular/core';
import { WorkloadTableItemBase } from '../../workload-table-item-base';

@Component({
  selector: '[pq-workload-ingress-classes-table-item]',
  templateUrl: './workload-ingress-classes-table-item.component.html',
  styleUrls: ['./workload-ingress-classes-table-item.component.scss'],
})
export class WorkloadIngressClassesTableItemComponent extends WorkloadTableItemBase {}
