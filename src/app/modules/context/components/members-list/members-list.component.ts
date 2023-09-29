import { Component } from '@angular/core';
import { ContextService } from '@pq/context/services/context.service';
import { UserService } from '@pq/user/services/user.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'pq-members-list',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.scss'],
})
export class MembersListComponent {
  constructor(private readonly _userService: UserService) {}

  get allUsers$(): BehaviorSubject<any[]> {
    return this._userService.allUsers$;
  }
}
