import { Component } from '@angular/core';
import { fadeInOut } from '@pq/core/animations';

@Component({
  selector: 'pq-cluster-details-sidebar',
  templateUrl: './cluster-details-sidebar.component.html',
  styleUrls: ['./cluster-details-sidebar.component.scss'],
  animations: [fadeInOut],
})
export class ClusterDetailsSidebarComponent {
  private _filterVisible: boolean = false;

  public toggleFilter(): void {
    this._filterVisible = !this._filterVisible;
  }

  get filterVisible(): boolean {
    return this._filterVisible;
  }
}
