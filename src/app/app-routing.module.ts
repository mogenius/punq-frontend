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
    // CONTEXT
    path: 'context',
    canActivate: [AuthorizationGuard],
    loadChildren: () =>
      import('./modules/context/context.module').then((m) => m.ContextModule),
  },
  {
    // Other
    path: '**',
    pathMatch: 'full',
    redirectTo: 'context',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
