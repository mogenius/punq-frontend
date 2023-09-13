import { Component } from '@angular/core';
import { WorkloadTableBase } from '../workload-table-base';

@Component({
  selector: 'pq-workload-certificate-table',
  templateUrl: './workload-certificate-table.component.html',
  styleUrls: ['./workload-certificate-table.component.scss'],
})
export class WorkloadCertificateTableComponent extends WorkloadTableBase {}
