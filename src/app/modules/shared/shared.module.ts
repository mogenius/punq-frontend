import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';
import { StorageService } from './services/storage.service';
import { ButtonComponent } from './components/button/button.component';
import { SelectComponent } from './components/inputs/select/select.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InputCheckboxComponent } from './components/inputs/input-checkbox/input-checkbox.component';
import { InputComponent } from './components/inputs/input/input.component';
import { InputPasswordComponent } from './components/inputs/input-password/input-password.component';
import { FormErrorComponent } from './components/inputs/form-error/form-error.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';
import { BannerListComponent } from './components/banner-list/banner-list.component';
import { BannerListItemComponent } from './components/banner-list/banner-list-item/banner-list-item.component';
import { FormatBytesPipe } from './pipes/format-bytes.pipe';
import { SafeHtmlPipe } from './pipes/safteHtml.pipe';
import { BaseModalComponent } from './components/base-modal/base-modal.component';
import { PageStateOverlayComponent } from './components/page-state-overlay/page-state-overlay.component';

export const HttpErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: HttpErrorInterceptor,
  multi: true,
};

const COMPONENTS: any[] = [
  //
  ButtonComponent,
  SelectComponent,
  InputCheckboxComponent,
  InputComponent,
  InputPasswordComponent,
  BannerListComponent,
  BannerListItemComponent,
  LoadingSpinnerComponent,
  BaseModalComponent,
  PageStateOverlayComponent,
];
const PAGES: any[] = [
  //
];
const FORMS: any[] = [
  //
];
const MODULES: any[] = [
  //
  RouterModule,
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  HttpClientModule,
  TranslateModule,
  NgSelectModule,
  NgbModule,
];
const PIPES: any = [
  //
  FormatBytesPipe,
  SafeHtmlPipe,
];
const SERVICES: any = [
  //
  StorageService,
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
    ...PIPES,
    ...MODALS,

    FormErrorComponent,
  ],
  imports: [...MODULES],
  exports: [...MODULES, ...PIPES, ...COMPONENTS, ...PAGES, ...FORMS, ...MODALS],
  providers: [...SERVICES, ...ROUTE_GUARDS, ...RESOLVERS],
  schemas: [
    //
  ],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [...SERVICES],
    };
  }
}
