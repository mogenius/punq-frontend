import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'pq-cluster-dashboard-page',
  templateUrl: './cluster-dashboard-page.component.html',
  styleUrls: ['./cluster-dashboard-page.component.scss'],
})
export class ClusterDashboardPageComponent {
  public clusterControl: FormControl = new FormControl({
    value: 'Cluster 01',
    disabled: false,
  });
}
