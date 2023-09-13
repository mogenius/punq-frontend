import { Component } from '@angular/core';
import { WorkloadTableBase } from '../workload-table-base';

@Component({
  selector: 'pq-workload-horizontal-pod-autoscaler-table',
  templateUrl: './workload-horizontal-pod-autoscaler-table.component.html',
  styleUrls: ['./workload-horizontal-pod-autoscaler-table.component.scss'],
})
export class WorkloadHorizontalPodAutoscalerTableComponent extends WorkloadTableBase {}
