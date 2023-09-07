import { ModuleWithProviders, NgModule } from '@angular/core';
import { SharedModule } from '@pq/shared/shared.module';
import { UserRoutingModule } from './user-routing.module';
import { UserOutletComponent } from './outlets/user-outlet/user-outlet.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { LoginFormComponent } from './forms/login-form/login-form.component';
import { UserTopNavComponent } from './components/user-top-nav/user-top-nav.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AuthorizationGuard } from './guards/authentication.guard';
import { UnauthorizationGuard } from './guards/unauthorization.guard';

export const authInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
};

const COMPONENTS: any[] = [
  //
  UserTopNavComponent,
];
const PAGES: any[] = [
  //
  UserOutletComponent,
  LoginPageComponent,
];
const FORMS: any[] = [
  //
  LoginFormComponent,
];
const MODULES: any[] = [
  //
  UserRoutingModule,
  SharedModule,
];

const ROUTE_GUARDS: any = [
  //
  AuthorizationGuard,
  UnauthorizationGuard,
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
  providers: [...ROUTE_GUARDS, ...RESOLVERS],
})
export class UserModule {
  static forRoot(): ModuleWithProviders<UserModule> {
    return {
      ngModule: UserModule,
      providers: [...ROUTE_GUARDS, ...RESOLVERS],
    };
  }
}
