import { Component } from '@angular/core';
import { MiscService } from '@pq/shared/services/misc.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'pq-cluster-top-nav',
  templateUrl: './cluster-top-nav.component.html',
  styleUrls: ['./cluster-top-nav.component.scss'],
})
export class ClusterTopNavComponent {
  constructor(private readonly _miscService: MiscService) {}

  get version$(): BehaviorSubject<any> {
    return this._miscService.version$;
  }
}
