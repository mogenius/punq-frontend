import { Component } from '@angular/core';
import { WorkloadTableItemBase } from '../../workload-table-item-base';

@Component({
  selector: '[pq-workload-leases-table-item]',
  templateUrl: './workload-leases-table-item.component.html',
  styleUrls: ['./workload-leases-table-item.component.scss'],
})
export class WorkloadLeasesTableItemComponent extends WorkloadTableItemBase {}
