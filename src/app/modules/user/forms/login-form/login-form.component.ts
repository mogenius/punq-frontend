import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseForm } from '@pq/core/base-form';
import { AuthService } from '@pq/user/services/auth.service';

@Component({
  selector: 'pq-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent extends BaseForm implements OnInit {
  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _authService: AuthService,
    private readonly _router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.initForm();
  }

  private initForm(): void {
    this._form = this._formBuilder.group({
      email: [
        { value: '', disabled: false },
        [Validators.required, Validators.email],
      ],
      password: [{ value: '', disabled: false }, [Validators.required]],
    });
  }

  public submit(): void {
    this.updateValueAndValidity(this._form);

    if (!this._form.valid) return;
    this._submitLoading = true;

    this._authService
      .login(this._form.get('email')?.value, this._form.get('password')?.value)
      .subscribe({
        next: (response) => {
          this._submitLoading = false;

          this._router.navigate(['/', 'cluster']);
        },
      });
  }

  public get token(): any {
    return this._authService.tokenValue;
  }
}
