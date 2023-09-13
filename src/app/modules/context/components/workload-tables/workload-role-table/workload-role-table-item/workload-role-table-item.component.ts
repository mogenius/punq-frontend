import { Component } from '@angular/core';
import { WorkloadTableItemBase } from '../../workload-table-item-base';

@Component({
  selector: '[pq-workload-role-table-item]',
  templateUrl: './workload-role-table-item.component.html',
  styleUrls: ['./workload-role-table-item.component.scss'],
})
export class WorkloadRoleTableItemComponent extends WorkloadTableItemBase {}
