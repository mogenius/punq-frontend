import { Component, OnDestroy, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { ContextService } from '@pq/context/services/context.service';
import { WebSocketService } from '@pq/context/services/websocket.service';
import { WorkloadService } from '@pq/context/services/workload.service';
import { Terminal } from 'xterm';
import { AttachAddon } from 'xterm-addon-attach';
import { FitAddon } from 'xterm-addon-fit';

@Component({
  selector: 'pq-xterm',
  templateUrl: './xterm.component.html',
  styleUrls: ['./xterm.component.scss']
})
export class XtermComponent implements AfterViewInit, OnDestroy {
  @ViewChild('terminal') terminalDiv: ElementRef;

  private _term: Terminal;
  private _termResize$: ResizeObserver;
  private _attachAddon: AttachAddon;
  private _websocket: WebSocket;

  constructor(
    private readonly _webSocketService: WebSocketService,
    private readonly _workloadService: WorkloadService,
    private readonly _contextService: ContextService
  ) {}

  ngAfterViewInit(): void {
    this._term = new Terminal({
      disableStdin: false,
      cursorBlink: true, // Enable cursor blinking
      fontSize: 12 // Set font size
    });
    this.initTerminal();
  }

  ngOnDestroy(): void {
    this._term.dispose();
    this._attachAddon.dispose();
    this._websocket.close();
    this._termResize$.disconnect();
    this._termResize$.unobserve(this.terminalDiv.nativeElement);
  }

  private initTerminal(): void {
    const namespace = this._workloadService.selectedWorkload$.value.metadata.namespace;
    const pod = this._workloadService.selectedWorkload$.value.metadata.name;
    const container = this._workloadService.selectedWorkload$.value.spec.containers[0].name;
    const context = this._contextService.currentContext$.value.id;

    this._websocket = this._webSocketService.getWebSocket(namespace, pod, container, context);

    this._attachAddon = new AttachAddon(this._websocket);
    this._term.loadAddon(this._attachAddon);

    // Resize term
    let fitAddon = new FitAddon();
    this._term.loadAddon(fitAddon);

    this._term.open(this.terminalDiv.nativeElement);
    fitAddon.fit();

    this._term.onResize((evt: { cols: number; rows: number }): void => {
      this.sendResize(evt.cols, evt.rows);
    });

    this._termResize$ = new ResizeObserver((entries: ResizeObserverEntry[]): void => {
      try {
        fitAddon && fitAddon.fit();
      } catch (err) {
        console.log(err);
      }
    });

    this._termResize$.observe(this.terminalDiv.nativeElement);

    this._websocket.onopen = () => {
      this.sendResize(this._term.cols, this._term.rows);
    };
  }

  private sendResize(cols: number, rows: number): void {
    const terminalSize = {
      cols: cols,
      rows: rows
    };
    this._websocket.send('\x04' + JSON.stringify(terminalSize));
  }
}
