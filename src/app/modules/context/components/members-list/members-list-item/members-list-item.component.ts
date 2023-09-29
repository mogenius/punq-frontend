import { Component, Input } from '@angular/core';

@Component({
  selector: 'pq-members-list-item',
  templateUrl: './members-list-item.component.html',
  styleUrls: ['./members-list-item.component.scss'],
})
export class MembersListItemComponent {
  @Input() user: any;

  public deleteUser(): void {
    console.log('deleteUser');
  }
}
