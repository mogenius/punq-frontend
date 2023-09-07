import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizationGuard } from '@pq/user/guards/authentication.guard';

const routes: Routes = [
  {
    // USER
    path: 'user',
    loadChildren: () =>
      import('./modules/user/user.module').then((m) => m.UserModule),
  },
  {
    // CLUSTER
    path: 'cluster',
    canActivate: [AuthorizationGuard],
    loadChildren: () =>
      import('./modules/cluster/cluster.module').then((m) => m.ClusterModule),
  },
  {
    // Other
    path: '**',
    redirectTo: 'cluster',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
