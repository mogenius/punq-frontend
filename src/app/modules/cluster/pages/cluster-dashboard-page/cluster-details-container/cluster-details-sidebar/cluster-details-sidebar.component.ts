import { Component } from '@angular/core';
import { AvailableResourcesResolver } from '@pq/cluster/resolvers/available-resources.resolver';
import { WorkloadService } from '@pq/cluster/services/workload.service';
import { fadeInOut } from '@pq/core/animations';

@Component({
  selector: 'pq-cluster-details-sidebar',
  templateUrl: './cluster-details-sidebar.component.html',
  styleUrls: ['./cluster-details-sidebar.component.scss'],
  animations: [fadeInOut],
})
export class ClusterDetailsSidebarComponent {
  constructor(private readonly _workloadService: WorkloadService) {}
  private _filterVisible: boolean = false;

  public toggleFilter(): void {
    this._filterVisible = !this._filterVisible;
  }

  get filterVisible(): boolean {
    return this._filterVisible;
  }

  get availableResources$(): any {
    return this._workloadService.availableResources$;
  }
}
