import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContextService } from '@pq/context/services/context.service';
import { BannerStateEnum } from '@pq/core/banner-state.enum';
import { BaseForm } from '@pq/core/base-form';
import { BannerService } from '@pq/shared/services/banner.service';
import deepmerge from 'deepmerge';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'pq-context-settings-form',
  templateUrl: './context-settings-form.component.html',
  styleUrls: ['./context-settings-form.component.scss'],
})
export class ContextSettingsFormComponent extends BaseForm implements OnInit {
  @Output() updatedCluster: EventEmitter<any> = new EventEmitter<any>();
  @Input() resetEmitter: Subject<void>;

  constructor(
    private readonly _contextService: ContextService,
    private readonly _router: Router,
    private readonly _bannerService: BannerService,
    private readonly _formBuilder: FormBuilder
  ) {
    super();
  }

  ngOnInit(): void {
    this._form = this._formBuilder.group({
      name: [
        //
        {
          value: this._contextService.currentContext$.value.name,
          disabled: false,
        },
        [Validators.required],
      ],
      provider: [
        {
          value:
            this._contextService.currentContext$.value.provider ?? undefined,
          disabled: false,
        },
        [Validators.required],
      ],
    });

    this._subscriptions.add(
      this._form.valueChanges.subscribe({
        next: (value) => {
          this.updatedCluster.emit(this._form.getRawValue());
        },
      })
    );

    this._subscriptions.add(
      this.resetEmitter.subscribe({
        next: () => {
          this._form.patchValue(this._contextService.currentContext$.value);
        },
      })
    );
  }

  public deleteContext(): void {
    this._contextService
      .delete(this._contextService.currentContext$.value.id)
      .subscribe({
        next: () => {
          console.log(this._contextService.contextList$.value);
          this._contextService.selectContext(null);
          this._router.navigate([
            '/',
            'context',
            this._contextService.contextList$.value[0].id,
          ]);
        },
        error: (error) => {
          this._bannerService.addBanner(
            BannerStateEnum.error,
            `
            <b>Failed to delete ${this._contextService.currentContext$.value.name}</b>
            <br>
            <span>${error.err}</span>
          `,
            6000
          );
        },
      });
  }

  get providers$(): BehaviorSubject<any> {
    return this._contextService.providers$;
  }
}
