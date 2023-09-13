import { Component } from '@angular/core';
import { WorkloadTableItemBase } from '../../workload-table-item-base';

@Component({
  selector: '[pq-workload-issuer-table-item]',
  templateUrl: './workload-issuer-table-item.component.html',
  styleUrls: ['./workload-issuer-table-item.component.scss'],
})
export class WorkloadIssuerTableItemComponent extends WorkloadTableItemBase {}
