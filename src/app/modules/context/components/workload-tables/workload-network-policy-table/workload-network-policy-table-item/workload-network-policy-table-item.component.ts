import { Component } from '@angular/core';
import { WorkloadTableItemBase } from '../../workload-table-item-base';

@Component({
  selector: '[pq-workload-network-policy-table-item]',
  templateUrl: './workload-network-policy-table-item.component.html',
  styleUrls: ['./workload-network-policy-table-item.component.scss'],
})
export class WorkloadNetworkPolicyTableItemComponent extends WorkloadTableItemBase {}
