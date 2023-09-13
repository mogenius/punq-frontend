import { NgModule } from '@angular/core';
import { ContextOutletComponent } from './outlets/context-outlet/context-outlet.component';
import { ContextRoutingModule } from './context-routing.module';
import { ContextTopNavComponent } from './components/context-top-nav/context-top-nav.component';
import { ContextDashboardPageComponent } from './pages/context-dashboard-page/context-dashboard-page.component';
import { SharedModule } from '@pq/shared/shared.module';
import { ContextHeaderBarComponent } from './components/context-header-bar/context-header-bar.component';
import { ContextDetailsContainerComponent } from './pages/context-dashboard-page/context-details-container/context-details-container.component';
import { ContextDetailsSidebarComponent } from './components/context-details-sidebar/context-details-sidebar.component';
import { ContextDetailsSidebarItemComponent } from './components/context-details-sidebar/context-details-sidebar-item/context-details-sidebar-item.component';
import { ContextDetailsSidebarWorkloadItemComponent } from './components/context-details-sidebar/context-details-sidebar-item/context-details-sidebar-workload-item/context-details-sidebar-workload-item.component';
import { ContextConnectPageComponent } from './pages/context-connect-page/context-connect-page.component';
import { WorkloadNamespaceTableComponent } from './components/workload-tables/workload-namespace-table/workload-namespace-table.component';
import { WorkloadNamespaceTableItemComponent } from './components/workload-tables/workload-namespace-table/workload-namespace-table-item/workload-namespace-table-item.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ContextInterceptor } from './interceptors/context.interceptor';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { WorkloadPodTableItemComponent } from './components/workload-tables/workload-pod-table/workload-pod-table-item/workload-pod-table-item.component';
import { WorkloadPodTableComponent } from './components/workload-tables/workload-pod-table/workload-pod-table.component';
import { WorkloadDetailsDescribeComponent } from './components/workload-details-describe/workload-details-describe.component';
import { ResourceWorkloadListPageComponent } from './pages/resource-workload-list-page/resource-workload-list-page.component';
import { ResourceWorkloadDetailsPageComponent } from './pages/resource-workload-details-page/resource-workload-details-page.component';
import { WorkloadDetailsLogsComponent } from './components/workload-details-logs/workload-details-logs.component';
import { WorkloadDetailsYamlComponent } from './components/workload-details-yaml/workload-details-yaml.component';
import { FilterPopoverComponent } from './components/filter-popover/filter-popover.component';

export const contextInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ContextInterceptor,
  multi: true,
};

const COMPONENTS: any[] = [
  //
  ContextTopNavComponent,
  ContextHeaderBarComponent,
  ContextDetailsContainerComponent,
  ContextDetailsSidebarComponent,
  ContextDetailsSidebarItemComponent,
  ContextDetailsSidebarWorkloadItemComponent,
  WorkloadDetailsLogsComponent,
  WorkloadDetailsYamlComponent,
  WorkloadDetailsDescribeComponent,
  ResourceWorkloadListPageComponent,
  ResourceWorkloadDetailsPageComponent,

  // WORKLOAD TABLES
  WorkloadNamespaceTableComponent,
  WorkloadNamespaceTableItemComponent,
  WorkloadPodTableComponent,
  WorkloadPodTableItemComponent,
];
const PAGES: any[] = [
  //
  ContextOutletComponent,
  ContextDashboardPageComponent,
  ContextConnectPageComponent,
];
const FORMS: any[] = [
  //
];
const MODULES: any[] = [
  //
  ContextRoutingModule,
  SharedModule,
  CodemirrorModule,
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
  declarations: [...COMPONENTS, ...PAGES, ...FORMS, ...MODALS, FilterPopoverComponent],
  imports: [...MODULES],
  exports: [...COMPONENTS, ...PAGES, ...FORMS, ...MODALS],
  providers: [...SERVICES, ...ROUTE_GUARDS, ...RESOLVERS],
})
export class ContextModule {}
