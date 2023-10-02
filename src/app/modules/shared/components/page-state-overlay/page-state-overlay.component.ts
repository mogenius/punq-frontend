import { Component } from '@angular/core';
import { LoadingService } from '@pq/shared/services/loading.service';

@Component({
  selector: 'pq-page-state-overlay',
  templateUrl: './page-state-overlay.component.html',
  styleUrls: ['./page-state-overlay.component.scss'],
})
export class PageStateOverlayComponent {
  constructor(private readonly _loadingService: LoadingService) {}

  get loading$() {
    return this._loadingService.isLoading$;
  }

  get errorState$() {
    return this._loadingService.errorState$;
  }
}
