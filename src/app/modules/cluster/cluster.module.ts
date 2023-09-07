import { NgModule } from '@angular/core';
import { ClusterOutletComponent } from './outlets/cluster-outlet/cluster-outlet.component';
import { ClusterRoutingModule } from './cluster-routing.module';
import { ClusterTopNavComponent } from './components/cluster-top-nav/cluster-top-nav.component';
import { ClusterDashboardPageComponent } from './pages/cluster-dashboard-page/cluster-dashboard-page.component';
import { SharedModule } from '@pq/shared/shared.module';
import { ClusterHeaderBarComponent } from './pages/cluster-dashboard-page/cluster-header-bar/cluster-header-bar.component';
import { ClusterDetailsContainerComponent } from './pages/cluster-dashboard-page/cluster-details-container/cluster-details-container.component';
import { ClusterDetailsSidebarComponent } from './pages/cluster-dashboard-page/cluster-details-container/cluster-details-sidebar/cluster-details-sidebar.component';
import { ClusterDetailsContentComponent } from './pages/cluster-dashboard-page/cluster-details-container/cluster-details-content/cluster-details-content.component';
import { ClusterDetailsSidebarItemComponent } from './pages/cluster-dashboard-page/cluster-details-container/cluster-details-sidebar/cluster-details-sidebar-item/cluster-details-sidebar-item.component';
import { ClusterDetailsSidebarWorkloadItemComponent } from './pages/cluster-dashboard-page/cluster-details-container/cluster-details-sidebar/cluster-details-sidebar-item/cluster-details-sidebar-workload-item/cluster-details-sidebar-workload-item.component';
import { ClusterConnectPageComponent } from './pages/cluster-connect-page/cluster-connect-page.component';

const COMPONENTS: any[] = [
  //
  ClusterTopNavComponent,
  ClusterHeaderBarComponent,
  ClusterDetailsContainerComponent,
  ClusterDetailsSidebarComponent,
  ClusterDetailsContentComponent,
  ClusterDetailsSidebarItemComponent,
  ClusterDetailsSidebarWorkloadItemComponent,
];
const PAGES: any[] = [
  //
  ClusterOutletComponent,
  ClusterDashboardPageComponent,
  ClusterConnectPageComponent,
];
const FORMS: any[] = [
  //
];
const MODULES: any[] = [
  //
  ClusterRoutingModule,
  SharedModule,
];
const SERVICES: any = [
  //
];
const ROUTE_GUARDS: any = [
  //
];
const MODALS: any = [
  //
];
const RESOLVERS: any = [
  //
];
@NgModule({
  declarations: [...COMPONENTS, ...PAGES, ...FORMS, ...MODALS],
  imports: [...MODULES],
  exports: [...COMPONENTS, ...PAGES, ...FORMS, ...MODALS],
  providers: [...SERVICES, ...ROUTE_GUARDS, ...RESOLVERS],
})
export class ClusterModule {}
