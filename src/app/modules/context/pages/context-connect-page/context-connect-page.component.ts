import { Component, HostListener } from '@angular/core';
import { ContextService } from '@pq/context/services/context.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'pq-context-connect-page',
  templateUrl: './context-connect-page.component.html',
  styleUrls: ['./context-connect-page.component.scss'],
})
export class ContextConnectPageComponent {
  @HostListener('document:keydown', ['$event']) keyDownEvent(
    $event: KeyboardEvent
  ) {
    if ($event.key === 'Enter') {
      this.view = this.view === 0 ? 1 : 0;
    }
  }
  public view: number = 0;
  private _contextList: any[] | null = null;

  constructor(private readonly _contextService: ContextService) {}

  public setClusterList(contextList: any[]) {
    this._contextList = contextList;
  }

  get currentContext$(): Observable<any> {
    return this._contextService.currentContext$;
  }

  get contextList(): any[] | null {
    return this._contextList;
  }
}
