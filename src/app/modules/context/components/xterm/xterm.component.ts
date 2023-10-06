import {
  Component,
  OnInit,
  OnDestroy,
  NgZone,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { WebSocketService } from '@pq/context/services/websocket.service';
import { WorkloadService } from '@pq/context/services/workload.service';
import { BaseSubscription } from '@pq/core/base-subscription';
import { Terminal } from 'xterm';

@Component({
  selector: 'pq-xterm',
  templateUrl: './xterm.component.html',
  styleUrls: ['./xterm.component.scss'],
})
export class XtermComponent extends BaseSubscription {
  @ViewChild('terminal') terminalDiv: ElementRef;
  private term: Terminal;

  constructor(
    private zone: NgZone,
    private element: ElementRef,
    private readonly _webSocketService: WebSocketService,
    private readonly _workloadService: WorkloadService
  ) {
    super();
  }

  ngOnInit(): void {
    // Initialize xterm
    this.term = new Terminal();

    this.initTerminal();
  }

  private async initTerminal(): Promise<void> {
    if (!this.terminalDiv?.nativeElement) {
      setTimeout(() => {
        this.initTerminal();
      }, 50);
      return;
    }

    // View rendered
    this.term.open(this.terminalDiv.nativeElement); // Init the div from html

    const namespace =
      this._workloadService.selectedWorkload$.value.metadata.namespace;
    const pod = this._workloadService.selectedWorkload$.value.metadata.name;
    const container =
      this._workloadService.selectedWorkload$.value.spec.containers[0].name;

    await this._webSocketService.connect(namespace, pod, container);

    // // Setup xterm to send data to the WebSocket on input
    // this.term.onData((data) => this._webSocketService.sendMessage(data));

    // // Subscribe to messages coming from the WebSocket
    // this._subscriptions.add(
    //   this._webSocketService.messages$.subscribe((message) => {
    //     this.zone.run(() => this.term.write(message));
    //   })
    // );
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.term.dispose(); // Dispose the xterm instance when the component is destroyed
    // this._webSocketService.disconnect(); // Disconnect the WebSocket when the component is destroyed
  }
}
