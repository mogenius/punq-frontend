import { Component } from '@angular/core';

@Component({
  selector: 'pq-cluster-details-sidebar-item',
  templateUrl: './cluster-details-sidebar-item.component.html',
  styleUrls: ['./cluster-details-sidebar-item.component.scss'],
})
export class ClusterDetailsSidebarItemComponent {
  private _childrenOpen: boolean = false;

  toggleOpen(state?: boolean) {
    this._childrenOpen = state !== undefined ? state : !this._childrenOpen;
  }

  get childrenOpen(): boolean {
    return this._childrenOpen;
  }
}
