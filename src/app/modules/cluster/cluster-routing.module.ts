import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClusterOutletComponent } from './outlets/cluster-outlet/cluster-outlet.component';
import { ClusterDashboardPageComponent } from './pages/cluster-dashboard-page/cluster-dashboard-page.component';
import { ClusterConnectPageComponent } from './pages/cluster-connect-page/cluster-connect-page.component';

const routes: Routes = [
  {
    path: '',
    component: ClusterOutletComponent,
    children: [
      { path: '', pathMatch: 'full', component: ClusterDashboardPageComponent },
      { path: 'connect', component: ClusterConnectPageComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClusterRoutingModule {}
