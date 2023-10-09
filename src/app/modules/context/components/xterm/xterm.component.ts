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
import { Subject, takeUntil } from 'rxjs';
import { Terminal } from 'xterm';
import { AttachAddon } from 'xterm-addon-attach';

@Component({
  selector: 'pq-xterm',
  templateUrl: './xterm.component.html',
  styleUrls: ['./xterm.component.scss'],
})
export class XtermComponent extends BaseSubscription {
  @ViewChild('terminal') terminalDiv: ElementRef;
  private term: Terminal;

  private destroy$ = new Subject<void>();
  private _connection: Subject<MessageEvent>;
  private inputCache: string = '';

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
    this.term = new Terminal({
      cursorBlink: true, // Enable cursor blinking
      cursorStyle: 'bar', // Change cursor style to bar
      fontFamily: 'Monaco, Courier New, monospace', // Set font family
      fontSize: 14, // Set font size
      theme: {
        background: '#000000',
        foreground: '#00FF00',
      },
    });

    //     const namespace =
    //       this._workloadService.selectedWorkload$.value.metadata.namespace;
    //     const pod = this._workloadService.selectedWorkload$.value.metadata.name;
    //     const container =
    //       this._workloadService.selectedWorkload$.value.spec.containers[0].name;

    //       const socket = new WebSocket('wss://punq.mogenius.dev/websocket/exec-sh?namespace=herbs-projekt-prod-fjp7dy&podname=godsservice-5f8944f97f-28gls&container=godsservice&token=eyJhbGciOiJFUzUxMiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3NMZXZlbCI6MiwiZXhwIjoxNjk3MjMxODc0LCJ1c2VySWQiOiJZakUzOVRTcTZJRm1vWWNXMnpUNGEifQ.AKn0wPLLOBCUDm8WCrot0OMx9mo2QvTlp8wC6f3lc-UiSERgMLR-Cshs5_8gXUMKsHvukY1GUke7BFn55XEKpIShATUzPRqMkkUwGZSNr_UeuqmZnYCusy5IjeoHaFq3uvIoL-STJA3CvsyvX9D1PtvaHznFWODjFZ1J-HAzdz_zvluA');
    // const attachAddon = new AttachAddon(socket);
    // this.term.loadAddon(attachAddon);

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

    await this.openConnection();

    // this.connection = this._webSocketService.connect(namespace, pod, container);

    // this.connection.pipe(takeUntil(this.destroy$)).subscribe(
    //   (message) => {
    //     console.log('Received message:', message);
    //     this.zone.run(() => this.term.writeln(message.data));
    //   },
    //   (error) => {
    //     console.error('WebSocket error:', error);
    //   }
    // );
    // this.term.writeln(`Connected to \x1B[1;3;31m${namespace}/${pod}\x1B[0m 🚀`)
    // this.term.write(`$ `)

    // this.term.onData((data) => this.sendMessage(data));
  }

  private async openConnection(): Promise<void> {
    const namespace =
      this._workloadService.selectedWorkload$.value.metadata.namespace;
    const pod = this._workloadService.selectedWorkload$.value.metadata.name;
    const container =
      this._workloadService.selectedWorkload$.value.spec.containers[0].name;

    // Connect to WebSocket
    this._connection = (await this._webSocketService.connect(
      namespace,
      pod,
      container
    )) as any;

    this._connection.subscribe((message) => {
      console.log('Received message:', message);
      this.term.writeln((message as any).data);
    });

    this.inputObserver();
  }

  private async inputObserver(): Promise<void> {
    this.term.onData((data) => {
      if (data === '\r') {
        console.log('hit enter. sending: ' + this.inputCache);
        this._webSocketService.sendMessage(this.inputCache);
        this.inputCache = '';
        this.term.writeln('');
      }
      if (data === '\x7f') {
        this.term.write('\b \b');
        this.inputCache = this.inputCache.slice(0, -1);
      } else {
        this.inputCache += data;
        this.term.write(data);
      }
    });
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.destroy$.next();
    this.destroy$.complete();
    this.term.dispose(); // Dispose the xterm instance when the component is destroyed
    // this._webSocketService.disconnect(); // Disconnect the WebSocket when the component is destroyed
  }
}
