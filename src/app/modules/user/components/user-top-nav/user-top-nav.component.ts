import { Component } from '@angular/core';
import { MiscService } from '@pq/shared/services/misc.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'pq-user-top-nav',
  templateUrl: './user-top-nav.component.html',
  styleUrls: ['./user-top-nav.component.scss'],
})
export class UserTopNavComponent {
  constructor(private readonly _miscService: MiscService) {}

  get version$(): BehaviorSubject<any> {
    return this._miscService.version$;
  }
}
