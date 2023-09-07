import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from '@pq/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '@pq/user/services/auth.service';
import { Observable } from 'rxjs';
import { UserModule, authInterceptorProvider } from '@pq/user/user.module';
import { ClusterModule } from '@pq/cluster/cluster.module';

// APP PROVIDER (See below)
export const appProviderFactory = (authService: AuthService) => {
  return (): Observable<any> => {
    return authService.initialize();
  };
};

// Here we inject the Services we need to initialize (Notice, that you have to implement another Provider if you want to load them similtaniously)
export const appProvider = {
  provide: APP_INITIALIZER,
  useFactory: appProviderFactory,
  deps: [AuthService],
  multi: true,
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    TranslateModule.forRoot(),
    NgbModule,
    UserModule.forRoot(),
  ],
  providers: [
    // Interceptors
    appProvider,
    authInterceptorProvider,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
