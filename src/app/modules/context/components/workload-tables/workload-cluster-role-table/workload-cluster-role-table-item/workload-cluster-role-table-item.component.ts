import { Component } from '@angular/core';
import { WorkloadTableItemBase } from '../../workload-table-item-base';

@Component({
  selector: '[pq-workload-cluster-role-table-item]',
  templateUrl: './workload-cluster-role-table-item.component.html',
  styleUrls: ['./workload-cluster-role-table-item.component.scss'],
})
export class WorkloadClusterRoleTableItemComponent extends WorkloadTableItemBase {}
