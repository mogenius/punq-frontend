import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WorkloadService } from '@pq/context/services/workload.service';

@Component({
  selector: 'pq-context-details-sidebar-workload-item',
  templateUrl: './context-details-sidebar-workload-item.component.html',
  styleUrls: ['./context-details-sidebar-workload-item.component.scss'],
})
export class ContextDetailsSidebarWorkloadItemComponent implements OnInit {
  @Input() workload: any;
  @Input() resource: any;

  constructor(private readonly _router: Router) {}

  ngOnInit(): void {}

  public selectWorkload() {
    this._router.navigate([
      '/',
      'context',
      this.resource,
      this.workload.metadata.name,
    ]);
  }
}
