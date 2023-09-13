import { Component } from '@angular/core';
import { WorkloadTableItemBase } from '../../workload-table-item-base';

@Component({
  selector: '[pq-workload-service-account-table-item]',
  templateUrl: './workload-service-account-table-item.component.html',
  styleUrls: ['./workload-service-account-table-item.component.scss'],
})
export class WorkloadServiceAccountTableItemComponent extends WorkloadTableItemBase {}
