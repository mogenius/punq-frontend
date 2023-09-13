import { Component } from '@angular/core';
import { WorkloadTableItemBase } from '../../workload-table-item-base';

@Component({
  selector: '[pq-workload-volume-attachment-table-item]',
  templateUrl: './workload-volume-attachment-table-item.component.html',
  styleUrls: ['./workload-volume-attachment-table-item.component.scss'],
})
export class WorkloadVolumeAttachmentTableItemComponent extends WorkloadTableItemBase {}
