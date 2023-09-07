import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserOutletComponent } from './outlets/user-outlet/user-outlet.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { UnauthorizationGuard } from './guards/unauthorization.guard';
import { AuthorizationGuard } from './guards/authentication.guard';

const routes: Routes = [
  {
    path: '',
    component: UserOutletComponent,
    children: [
      {
        // LOGGED IN AREA (Auth Token available)
        path: '',
        canActivate: [UnauthorizationGuard],
        children: [
          {
            path: 'login',
            component: LoginPageComponent,
          },
        ],
      },

      {
        // LOGGED OUT AREA (Auth Token not available)
        path: '',
        canActivate: [AuthorizationGuard],
        children: [
          // Todo Profile
        ],
      },
      {
        path: '**',
        redirectTo: 'login',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
