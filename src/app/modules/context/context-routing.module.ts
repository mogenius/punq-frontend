import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkloadDetailsDescribeComponent } from './components/workload-details-describe/workload-details-describe.component';
import { WorkloadDetailsLogsComponent } from './components/workload-details-logs/workload-details-logs.component';
import { WorkloadDetailsYamlComponent } from './components/workload-details-yaml/workload-details-yaml.component';
import { ContextOutletComponent } from './outlets/context-outlet/context-outlet.component';
import { ContextConnectPageComponent } from './pages/context-connect-page/context-connect-page.component';
import { ContextDashboardPageComponent } from './pages/context-dashboard-page/context-dashboard-page.component';
import { ResourceWorkloadDetailsPageComponent } from './pages/resource-workload-details-page/resource-workload-details-page.component';
import { ResourceWorkloadListPageComponent } from './pages/resource-workload-list-page/resource-workload-list-page.component';
import { ContextDetailsResolver } from './resolvers/context-details.resolver';
import { ContextListResolver } from './resolvers/context-list.resolver';
import { WorkloadDetailsResolver } from './resolvers/workload-details.resolver';
import { WorkloadListResolver } from './resolvers/workload-list.resolver';
import { WorkloadLogsResolver } from './resolvers/workload-logs.resolver';
import { ContextSettingsPageComponent } from './pages/context-settings-page/context-settings-page.component';
import { ContextMembersPageComponent } from './pages/context-members-page/context-members-page.component';
import { ContextDetailsOutletComponent } from './outlets/context-details-outlet/context-details-outlet.component';
import { MembersResolver } from './resolvers/members.resolver';
import { LeaveDetailsGuard } from './guards/leave-details.guard';
import { ProvidersResolver } from './resolvers/providers.resolver';

const routes: Routes = [
  {
    path: '',
    component: ContextOutletComponent, // TOP NAV
    resolve: {
      contextList: ContextListResolver,
      ProvidersResolver,
    },
    children: [
      { path: 'connect', component: ContextConnectPageComponent },
      {
        path: ':contextId',
        resolve: {
          ContextDetailsResolver,
        },
        component: ContextDetailsOutletComponent,
        children: [
          { path: 'settings', component: ContextSettingsPageComponent },
          {
            path: 'members',
            resolve: { MembersResolver },
            component: ContextMembersPageComponent,
          },
          {
            path: 'workloads',
            component: ContextDashboardPageComponent, // SIDEBAR AND HEADER

            children: [
              {
                path: ':resource',
                resolve: { WorkloadListResolver },
                children: [
                  {
                    path: 'namespace/:namespace',
                    children: [
                      {
                        // WORKLOAD DETAILS FOR RESOURCE
                        path: ':workload',
                        component: ResourceWorkloadDetailsPageComponent,
                        resolve: { WorkloadDetailsResolver },
                        children: [
                          {
                            path: 'logs',
                            component: WorkloadDetailsLogsComponent,
                            resolve: [WorkloadLogsResolver],
                          },
                          {
                            path: 'describe',
                            component: WorkloadDetailsDescribeComponent,
                          },
                          {
                            path: 'yaml',
                            component: WorkloadDetailsYamlComponent,
                            canDeactivate: [LeaveDetailsGuard],
                          },
                          {
                            path: '**',
                            redirectTo: 'logs',
                          },
                        ],
                      },
                    ],
                  },

                  {
                    // WORKLOAD LIST FOR RESOURCE
                    path: '',
                    pathMatch: 'full',
                    component: ResourceWorkloadListPageComponent,
                  },
                ],
              },
              {
                path: '**',
                redirectTo: 'Namespace',
              },
            ],
          },
          {
            path: '**',
            redirectTo: 'workloads',
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContextRoutingModule {}
