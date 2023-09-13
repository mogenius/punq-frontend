import { Component } from '@angular/core';
import { WorkloadTableItemBase } from '../../workload-table-item-base';

@Component({
  selector: '[pq-workload-deployment-table-item]',
  templateUrl: './workload-deployment-table-item.component.html',
  styleUrls: ['./workload-deployment-table-item.component.scss'],
})
export class WorkloadDeploymentTableItemComponent extends WorkloadTableItemBase {}
