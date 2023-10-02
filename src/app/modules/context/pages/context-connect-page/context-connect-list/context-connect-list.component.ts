import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ContextService } from '@pq/context/services/context.service';
import { BannerStateEnum } from '@pq/core/banner-state.enum';
import { BannerService } from '@pq/shared/services/banner.service';
import { cloneDeep } from 'lodash';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'pq-context-connect-list',
  templateUrl: './context-connect-list.component.html',
  styleUrls: ['./context-connect-list.component.scss'],
})
export class ContextConnectListComponent {
  @Input() set contextList(contextList: any[]) {
    this._contextList = contextList;
    this._contextListReq = cloneDeep(contextList);
  }

  private _disabledList: any[] = [];

  private _contextList: any[] | null = null;
  private _contextListReq: any[] | null = null;

  constructor(
    private readonly _contextService: ContextService,
    private readonly _bannerService: BannerService,
    private readonly _router: Router
  ) {}

  public toggleDisable(context: any, state: boolean): void {
    const index = this._disabledList.indexOf(context);

    if (index !== -1) {
      this._disabledList.splice(index, 1);
    } else {
      this._disabledList.push(context);
    }
  }

  public isDisabled(context: any): boolean {
    const index = this._disabledList.indexOf(context);

    if (index !== -1) {
      return true;
    } else {
      return false;
    }
  }

  public addClusters(): void {
    const addContexts = this._contextList?.filter((context) => {
      return !this.isDisabled(context);
    });

    if (!addContexts || addContexts.length === 0) {
      this._bannerService.addBanner(
        BannerStateEnum.error,
        'No cluster was selected.',
        5000
      );
      return;
    }

    this._contextService.addContexts(addContexts).subscribe({
      next: (value) => {
        this._contextService.contextList().subscribe({
          next: (value) => {
            this._router.navigate([
              '/',
              'context',
              this._contextService.currentContext$.value?.id,
              'workloads',
            ]);
          },
        });
      },
      error: (error) => {
        console.log('error', error);
      },
    });
  }

  get contextList(): any[] | null {
    return this._contextList;
  }

  get contextListReq(): any[] | null {
    return this._contextListReq;
  }

  get currentContext$(): BehaviorSubject<any> {
    return this._contextService.currentContext$;
  }
}
