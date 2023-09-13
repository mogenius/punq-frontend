import { Component } from '@angular/core';
import { WorkloadTableItemBase } from '../../workload-table-item-base';

@Component({
  selector: '[pq-workload-persistent-volume-claim-table-item]',
  templateUrl: './workload-persistent-volume-claim-table-item.component.html',
  styleUrls: ['./workload-persistent-volume-claim-table-item.component.scss'],
})
export class WorkloadPersistentVolumeClaimTableItemComponent extends WorkloadTableItemBase {}
