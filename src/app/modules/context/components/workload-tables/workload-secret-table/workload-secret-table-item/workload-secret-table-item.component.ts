import { Component } from '@angular/core';
import { WorkloadTableItemBase } from '../../workload-table-item-base';

@Component({
  selector: '[pq-workload-secret-table-item]',
  templateUrl: './workload-secret-table-item.component.html',
  styleUrls: ['./workload-secret-table-item.component.scss'],
})
export class WorkloadSecretTableItemComponent extends WorkloadTableItemBase {}
