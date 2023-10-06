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
import { WorkloadNamespaceTableComponent } from './components/workload-tables/workload-namespace-table/workload-namespace-table.component';
import { WorkloadNamespaceTableItemComponent } from './components/workload-tables/workload-namespace-table/workload-namespace-table-item/workload-namespace-table-item.component';
import { WorkloadDeploymentTableComponent } from './components/workload-tables/workload-deployment-table/workload-deployment-table.component';
import { WorkloadCertificateTableItemComponent } from './components/workload-tables/workload-certificate-table/workload-certificate-table-item/workload-certificate-table-item.component';
import { WorkloadCertificateTableComponent } from './components/workload-tables/workload-certificate-table/workload-certificate-table.component';
import { WorkloadClusterRoleBindingTableItemComponent } from './components/workload-tables/workload-cluster-role-binding-table/workload-cluster-role-binding-table-item/workload-cluster-role-binding-table-item.component';
import { WorkloadClusterRoleBindingTableComponent } from './components/workload-tables/workload-cluster-role-binding-table/workload-cluster-role-binding-table.component';
import { WorkloadClusterRoleTableItemComponent } from './components/workload-tables/workload-cluster-role-table/workload-cluster-role-table-item/workload-cluster-role-table-item.component';
import { WorkloadClusterRoleTableComponent } from './components/workload-tables/workload-cluster-role-table/workload-cluster-role-table.component';
import { WorkloadConfigmapTableItemComponent } from './components/workload-tables/workload-configmap-table/workload-configmap-table-item/workload-configmap-table-item.component';
import { WorkloadConfigmapTableComponent } from './components/workload-tables/workload-configmap-table/workload-configmap-table.component';
import { WorkloadCrdsTableItemComponent } from './components/workload-tables/workload-crds-table/workload-crds-table-item/workload-crds-table-item.component';
import { WorkloadCrdsTableComponent } from './components/workload-tables/workload-crds-table/workload-crds-table.component';
import { WorkloadCronJobTableItemComponent } from './components/workload-tables/workload-cron-job-table/workload-cron-job-table-item/workload-cron-job-table-item.component';
import { WorkloadCronJobTableComponent } from './components/workload-tables/workload-cron-job-table/workload-cron-job-table.component';
import { WorkloadDaemonSetTableItemComponent } from './components/workload-tables/workload-daemon-set-table/workload-daemon-set-table-item/workload-daemon-set-table-item.component';
import { WorkloadDaemonSetTableComponent } from './components/workload-tables/workload-daemon-set-table/workload-daemon-set-table.component';
import { WorkloadDeploymentTableItemComponent } from './components/workload-tables/workload-deployment-table/workload-deployment-table-item/workload-deployment-table-item.component';
import { WorkloadEndpointsTableItemComponent } from './components/workload-tables/workload-endpoints-table/workload-endpoints-table-item/workload-endpoints-table-item.component';
import { WorkloadEndpointsTableComponent } from './components/workload-tables/workload-endpoints-table/workload-endpoints-table.component';
import { WorkloadEventTableItemComponent } from './components/workload-tables/workload-event-table/workload-event-table-item/workload-event-table-item.component';
import { WorkloadEventTableComponent } from './components/workload-tables/workload-event-table/workload-event-table.component';
import { WorkloadHorizontalPodAutoscalerTableItemComponent } from './components/workload-tables/workload-horizontal-pod-autoscaler-table/workload-horizontal-pod-autoscaler-table-item/workload-horizontal-pod-autoscaler-table-item.component';
import { WorkloadHorizontalPodAutoscalerTableComponent } from './components/workload-tables/workload-horizontal-pod-autoscaler-table/workload-horizontal-pod-autoscaler-table.component';
import { WorkloadIngressTableItemComponent } from './components/workload-tables/workload-ingress-table/workload-ingress-table-item/workload-ingress-table-item.component';
import { WorkloadIngressTableComponent } from './components/workload-tables/workload-ingress-table/workload-ingress-table.component';
import { WorkloadIssuerTableItemComponent } from './components/workload-tables/workload-issuer-table/workload-issuer-table-item/workload-issuer-table-item.component';
import { WorkloadIssuerTableComponent } from './components/workload-tables/workload-issuer-table/workload-issuer-table.component';
import { WorkloadJobTableItemComponent } from './components/workload-tables/workload-job-table/workload-job-table-item/workload-job-table-item.component';
import { WorkloadJobTableComponent } from './components/workload-tables/workload-job-table/workload-job-table.component';
import { WorkloadLeasesTableItemComponent } from './components/workload-tables/workload-leases-table/workload-leases-table-item/workload-leases-table-item.component';
import { WorkloadLeasesTableComponent } from './components/workload-tables/workload-leases-table/workload-leases-table.component';
import { WorkloadNetworkPolicyTableItemComponent } from './components/workload-tables/workload-network-policy-table/workload-network-policy-table-item/workload-network-policy-table-item.component';
import { WorkloadNetworkPolicyTableComponent } from './components/workload-tables/workload-network-policy-table/workload-network-policy-table.component';
import { WorkloadNodeTableItemComponent } from './components/workload-tables/workload-node-table/workload-node-table-item/workload-node-table-item.component';
import { WorkloadNodeTableComponent } from './components/workload-tables/workload-node-table/workload-node-table.component';
import { WorkloadOrdersTableItemComponent } from './components/workload-tables/workload-orders-table/workload-orders-table-item/workload-orders-table-item.component';
import { WorkloadOrdersTableComponent } from './components/workload-tables/workload-orders-table/workload-orders-table.component';
import { WorkloadPersistentVolumeClaimTableItemComponent } from './components/workload-tables/workload-persistent-volume-claim-table/workload-persistent-volume-claim-table-item/workload-persistent-volume-claim-table-item.component';
import { WorkloadPersistentVolumeClaimTableComponent } from './components/workload-tables/workload-persistent-volume-claim-table/workload-persistent-volume-claim-table.component';
import { WorkloadPersistentVolumeTableItemComponent } from './components/workload-tables/workload-persistent-volume-table/workload-persistent-volume-table-item/workload-persistent-volume-table-item.component';
import { WorkloadPersistentVolumeTableComponent } from './components/workload-tables/workload-persistent-volume-table/workload-persistent-volume-table.component';
import { WorkloadReplicaSetTableItemComponent } from './components/workload-tables/workload-replica-set-table/workload-replica-set-table-item/workload-replica-set-table-item.component';
import { WorkloadReplicaSetTableComponent } from './components/workload-tables/workload-replica-set-table/workload-replica-set-table.component';
import { WorkloadRoleBindingTableItemComponent } from './components/workload-tables/workload-role-binding-table/workload-role-binding-table-item/workload-role-binding-table-item.component';
import { WorkloadRoleBindingTableComponent } from './components/workload-tables/workload-role-binding-table/workload-role-binding-table.component';
import { WorkloadRoleTableItemComponent } from './components/workload-tables/workload-role-table/workload-role-table-item/workload-role-table-item.component';
import { WorkloadRoleTableComponent } from './components/workload-tables/workload-role-table/workload-role-table.component';
import { WorkloadSecretTableItemComponent } from './components/workload-tables/workload-secret-table/workload-secret-table-item/workload-secret-table-item.component';
import { WorkloadSecretTableComponent } from './components/workload-tables/workload-secret-table/workload-secret-table.component';
import { WorkloadServiceAccountTableItemComponent } from './components/workload-tables/workload-service-account-table/workload-service-account-table-item/workload-service-account-table-item.component';
import { WorkloadServiceAccountTableComponent } from './components/workload-tables/workload-service-account-table/workload-service-account-table.component';
import { WorkloadServiceTableItemComponent } from './components/workload-tables/workload-service-table/workload-service-table-item/workload-service-table-item.component';
import { WorkloadServiceTableComponent } from './components/workload-tables/workload-service-table/workload-service-table.component';
import { WorkloadStatefulSetTableItemComponent } from './components/workload-tables/workload-stateful-set-table/workload-stateful-set-table-item/workload-stateful-set-table-item.component';
import { WorkloadStatefulSetTableComponent } from './components/workload-tables/workload-stateful-set-table/workload-stateful-set-table.component';
import { WorkloadVolumeAttachmentTableItemComponent } from './components/workload-tables/workload-volume-attachment-table/workload-volume-attachment-table-item/workload-volume-attachment-table-item.component';
import { WorkloadVolumeAttachmentTableComponent } from './components/workload-tables/workload-volume-attachment-table/workload-volume-attachment-table.component';
import { WorkloadCertificaterequestTableComponent } from './components/workload-tables/workload-certificaterequest-table/workload-certificaterequest-table.component';
import { WorkloadCertificaterequestTableItemComponent } from './components/workload-tables/workload-certificaterequest-table/workload-certificaterequest-table-item/workload-certificaterequest-table-item.component';
import { WorkloadClusterissuerTableItemComponent } from './components/workload-tables/workload-clusterissuer-table/workload-clusterissuer-table-item/workload-clusterissuer-table-item.component';
import { WorkloadClusterissuerTableComponent } from './components/workload-tables/workload-clusterissuer-table/workload-clusterissuer-table.component';
import { WorkloadStorageclassTableItemComponent } from './components/workload-tables/workload-storageclass-table/workload-storageclass-table-item/workload-storageclass-table-item.component';
import { WorkloadStorageclassTableComponent } from './components/workload-tables/workload-storageclass-table/workload-storageclass-table.component';
import { WorkloadPriorityclassesTableComponent } from './components/workload-tables/workload-priorityclasses-table/workload-priorityclasses-table.component';
import { WorkloadPriorityclassesTableItemComponent } from './components/workload-tables/workload-priorityclasses-table/workload-priorityclasses-table-item/workload-priorityclasses-table-item.component';
import { WorkloadVolumesnapshotsTableItemComponent } from './components/workload-tables/workload-volumesnapshots-table/workload-volumesnapshots-table-item/workload-volumesnapshots-table-item.component';
import { WorkloadVolumesnapshotsTableComponent } from './components/workload-tables/workload-volumesnapshots-table/workload-volumesnapshots-table.component';
import { WorkloadResourcequotasTableItemComponent } from './components/workload-tables/workload-resourcequotas-table/workload-resourcequotas-table-item/workload-resourcequotas-table-item.component';
import { WorkloadResourcequotasTableComponent } from './components/workload-tables/workload-resourcequotas-table/workload-resourcequotas-table.component';
import { ConfigUploadDropzoneComponent } from './pages/context-connect-page/config-upload-dropzone/config-upload-dropzone.component';
import { ContextConnectListComponent } from './pages/context-connect-page/context-connect-list/context-connect-list.component';
import { ContextConnectListItemComponent } from './pages/context-connect-page/context-connect-list/context-connect-list-item/context-connect-list-item.component';
import { ClusterNavigationComponent } from './components/cluster-navigation/cluster-navigation.component';
import { ContextSettingsPageComponent } from './pages/context-settings-page/context-settings-page.component';
import { ContextMembersPageComponent } from './pages/context-members-page/context-members-page.component';
import { ContextDetailsOutletComponent } from './outlets/context-details-outlet/context-details-outlet.component';
import { MembersListComponent } from './components/members-list/members-list.component';
import { MembersListItemComponent } from './components/members-list/members-list-item/members-list-item.component';
import { AddUserModalComponent } from './modals/add-user-modal/add-user-modal.component';
import { UnsafedModificationModalComponent } from './modals/unsafed-modification-modal/unsafed-modification-modal.component';
import { WorkloadIngressClassesTableComponent } from './components/workload-tables/workload-ingress-classes-table/workload-ingress-classes-table.component';
import { WorkloadIngressClassesTableItemComponent } from './components/workload-tables/workload-ingress-classes-table/workload-ingress-classes-table-item/workload-ingress-classes-table-item.component';
import { ContextSettingsFormComponent } from './forms/context-settings-form/context-settings-form.component';
import { XtermComponent } from './components/xterm/xterm.component';
import { WorkloadDetailsTerminalComponent } from './components/workload-details-terminal/workload-details-terminal.component';

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
  WorkloadDeploymentTableComponent,
  WorkloadDeploymentTableItemComponent,
  WorkloadServiceTableComponent,
  WorkloadServiceTableItemComponent,
  WorkloadIngressTableComponent,
  WorkloadIngressTableItemComponent,
  WorkloadConfigmapTableComponent,
  WorkloadConfigmapTableItemComponent,
  WorkloadSecretTableComponent,
  WorkloadSecretTableItemComponent,
  WorkloadNodeTableComponent,
  WorkloadNodeTableItemComponent,
  WorkloadDaemonSetTableComponent,
  WorkloadDaemonSetTableItemComponent,
  WorkloadStatefulSetTableComponent,
  WorkloadStatefulSetTableItemComponent,
  WorkloadJobTableComponent,
  WorkloadJobTableItemComponent,
  WorkloadCronJobTableComponent,
  WorkloadCronJobTableItemComponent,
  WorkloadReplicaSetTableComponent,
  WorkloadReplicaSetTableItemComponent,
  WorkloadPersistentVolumeTableComponent,
  WorkloadPersistentVolumeTableItemComponent,
  WorkloadPersistentVolumeClaimTableComponent,
  WorkloadPersistentVolumeClaimTableItemComponent,
  WorkloadHorizontalPodAutoscalerTableComponent,
  WorkloadHorizontalPodAutoscalerTableItemComponent,
  WorkloadEventTableComponent,
  WorkloadEventTableItemComponent,
  WorkloadCertificateTableComponent,
  WorkloadCertificateTableItemComponent,
  WorkloadCertificaterequestTableComponent,
  WorkloadCertificaterequestTableItemComponent,
  WorkloadOrdersTableComponent,
  WorkloadOrdersTableItemComponent,
  WorkloadIssuerTableComponent,
  WorkloadIssuerTableItemComponent,
  WorkloadClusterissuerTableComponent,
  WorkloadClusterissuerTableItemComponent,
  WorkloadServiceAccountTableComponent,
  WorkloadServiceAccountTableItemComponent,
  WorkloadRoleTableComponent,
  WorkloadRoleTableItemComponent,
  WorkloadRoleBindingTableComponent,
  WorkloadRoleBindingTableItemComponent,
  WorkloadClusterRoleTableComponent,
  WorkloadClusterRoleTableItemComponent,
  WorkloadClusterRoleBindingTableComponent,
  WorkloadClusterRoleBindingTableItemComponent,
  WorkloadVolumeAttachmentTableComponent,
  WorkloadVolumeAttachmentTableItemComponent,
  WorkloadNetworkPolicyTableComponent,
  WorkloadNetworkPolicyTableItemComponent,
  WorkloadStorageclassTableComponent,
  WorkloadStorageclassTableItemComponent,
  WorkloadCrdsTableComponent,
  WorkloadCrdsTableItemComponent,
  WorkloadEndpointsTableComponent,
  WorkloadEndpointsTableItemComponent,
  WorkloadLeasesTableComponent,
  WorkloadLeasesTableItemComponent,
  WorkloadPriorityclassesTableComponent,
  WorkloadPriorityclassesTableItemComponent,
  WorkloadVolumesnapshotsTableComponent,
  WorkloadVolumesnapshotsTableItemComponent,
  WorkloadResourcequotasTableComponent,
  WorkloadResourcequotasTableItemComponent,
  WorkloadIngressClassesTableComponent,
  WorkloadIngressClassesTableItemComponent,
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
  declarations: [
    ...COMPONENTS,
    ...PAGES,
    ...FORMS,
    ...MODALS,
    FilterPopoverComponent,
    ConfigUploadDropzoneComponent,
    ContextConnectListComponent,
    ContextConnectListItemComponent,
    ClusterNavigationComponent,
    ContextSettingsPageComponent,
    ContextMembersPageComponent,
    ContextDetailsOutletComponent,
    MembersListComponent,
    MembersListItemComponent,
    AddUserModalComponent,
    UnsafedModificationModalComponent,
    ContextSettingsFormComponent,
    XtermComponent,
    WorkloadDetailsTerminalComponent,
  ],
  imports: [...MODULES],
  exports: [...COMPONENTS, ...PAGES, ...FORMS, ...MODALS],
  providers: [...SERVICES, ...ROUTE_GUARDS, ...RESOLVERS],
})
export class ContextModule {}
