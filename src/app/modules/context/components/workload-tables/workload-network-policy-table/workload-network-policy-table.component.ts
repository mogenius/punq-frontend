import { Component } from '@angular/core';
import { WorkloadTableBase } from '../workload-table-base';

@Component({
  selector: 'pq-workload-network-policy-table',
  templateUrl: './workload-network-policy-table.component.html',
  styleUrls: ['./workload-network-policy-table.component.scss'],
})
export class WorkloadNetworkPolicyTableComponent extends WorkloadTableBase {}
