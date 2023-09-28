import { Component, Input } from '@angular/core';
import { ContextService } from '@pq/context/services/context.service';
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
    console.log('this._contextListReq', this._contextListReq);
  }

  private _contextList: any[] | null = null;
  private _contextListReq: any[] | null = null;

  constructor(private readonly _contextService: ContextService) {}

  public toggleDisable(context: any, state: boolean): void {
    const index = this._contextListReq?.find((c) => c.id === context.id);

    if (!!index) {
      this._contextListReq?.splice(index, 1);
    } else {
      this._contextListReq?.push(context);
    }
  }

  public isDisabled(context: any): boolean {
    const index = this._contextListReq?.find((c) => c.id === context.id);

    if (!index) {
      return true;
    } else {
      return false;
    }
  }

  public addClusters(): void {
    if (!this._contextListReq || this._contextListReq.length === 0) return;
    this._contextService.addContexts(this._contextListReq).subscribe({
      next: (value) => {
        console.log('value', value);
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
