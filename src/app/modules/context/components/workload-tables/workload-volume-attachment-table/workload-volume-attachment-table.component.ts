import { Component } from '@angular/core';
import { WorkloadTableBase } from '../workload-table-base';

@Component({
  selector: 'pq-workload-volume-attachment-table',
  templateUrl: './workload-volume-attachment-table.component.html',
  styleUrls: ['./workload-volume-attachment-table.component.scss'],
})
export class WorkloadVolumeAttachmentTableComponent extends WorkloadTableBase {}
