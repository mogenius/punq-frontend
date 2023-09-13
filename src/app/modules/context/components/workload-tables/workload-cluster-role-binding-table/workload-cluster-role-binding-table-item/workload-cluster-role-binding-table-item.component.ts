import { Component } from '@angular/core';
import { WorkloadTableItemBase } from '../../workload-table-item-base';

@Component({
  selector: '[pq-workload-cluster-role-binding-table-item]',
  templateUrl: './workload-cluster-role-binding-table-item.component.html',
  styleUrls: ['./workload-cluster-role-binding-table-item.component.scss'],
})
export class WorkloadClusterRoleBindingTableItemComponent extends WorkloadTableItemBase {}
