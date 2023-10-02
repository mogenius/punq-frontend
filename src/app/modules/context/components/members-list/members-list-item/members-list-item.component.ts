import { Component, Input } from '@angular/core';
import { UserService } from '@pq/user/services/user.service';

@Component({
  selector: 'pq-members-list-item',
  templateUrl: './members-list-item.component.html',
  styleUrls: ['./members-list-item.component.scss'],
})
export class MembersListItemComponent {
  @Input() user: any;

  constructor(private readonly _userService: UserService) {}

  public deleteUser(): void {
    this._userService.deleteUser().subscribe({
      next: () => {
        this._userService.allUsers$.next(
          this._userService.allUsers$.value.filter(
            (user: any) => user.id !== this.user.id
          )
        );
      },
      error: (error) => {},
    });
  }
}
