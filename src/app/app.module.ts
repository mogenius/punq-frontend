import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from '@pq/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '@pq/user/services/auth.service';
import { Observable, forkJoin } from 'rxjs';
import { UserModule, authInterceptorProvider } from '@pq/user/user.module';
import { MiscService } from '@pq/shared/services/misc.service';
import { ContextService } from '@pq/context/services/context.service';
import { contextInterceptorProvider } from '@pq/context/context.module';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';

// APP PROVIDER (See below)
export const appProviderFactory = (
  authService: AuthService,
  miscService: MiscService,
  contextService: ContextService
) => {
  return (): Observable<any> => {
    contextService.initContext();
    return forkJoin([authService.initialize(), miscService.version()]);
  };
};

// Here we inject the Services we need to initialize (Notice, that you have to implement another Provider if you want to load them similtaniously)
export const appProvider = {
  provide: APP_INITIALIZER,
  useFactory: appProviderFactory,
  deps: [AuthService, MiscService, ContextService],
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
    contextInterceptorProvider,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
