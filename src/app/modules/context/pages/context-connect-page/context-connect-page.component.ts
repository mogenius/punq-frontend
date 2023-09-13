import { Component, HostListener } from '@angular/core';

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
}
