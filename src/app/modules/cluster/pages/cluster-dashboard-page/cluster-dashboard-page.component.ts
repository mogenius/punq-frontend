import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ClusterService } from '@pq/cluster/services/cluster.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'pq-cluster-dashboard-page',
  templateUrl: './cluster-dashboard-page.component.html',
  styleUrls: ['./cluster-dashboard-page.component.scss'],
})
export class ClusterDashboardPageComponent implements OnInit {
  private _clusterControl: FormControl;

  constructor(private readonly _clusterService: ClusterService) {}

  ngOnInit(): void {
    this._clusterControl = new FormControl({
      value: this._clusterService.currentContext$.value?.id ?? '',
      disabled: false,
    });
  }

  get contextList$(): BehaviorSubject<any> {
    return this._clusterService.contextList$;
  }

  get clusterControl(): FormControl {
    return this._clusterControl;
  }
}
