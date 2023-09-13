import { Component } from '@angular/core';
import { WorkloadTableItemBase } from '../../workload-table-item-base';

@Component({
  selector: '[pq-workload-role-binding-table-item]',
  templateUrl: './workload-role-binding-table-item.component.html',
  styleUrls: ['./workload-role-binding-table-item.component.scss'],
})
export class WorkloadRoleBindingTableItemComponent extends WorkloadTableItemBase {}
