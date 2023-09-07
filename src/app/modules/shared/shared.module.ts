import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
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

const COMPONENTS: any[] = [
  //
  ButtonComponent,
  SelectComponent,
  InputCheckboxComponent,
  InputComponent,
  InputPasswordComponent,
  LoadingSpinnerComponent,
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
    ...MODALS,
    FormErrorComponent,
  ],
  imports: [...MODULES],
  exports: [...MODULES, ...COMPONENTS, ...PAGES, ...FORMS, ...MODALS],
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
