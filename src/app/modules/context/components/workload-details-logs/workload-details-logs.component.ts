import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  SecurityContext,
  ViewChild,
} from '@angular/core';
import { CodemirrorComponent } from '@ctrl/ngx-codemirror';
import { WorkloadService } from '@pq/context/services/workload.service';
import moment, { Moment } from 'moment';
import { BaseSubscription } from '@pq/core/base-subscription';
import { Subscription, tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'pq-workload-details-logs',
  templateUrl: './workload-details-logs.component.html',
  styleUrls: ['./workload-details-logs.component.scss'],
})
export class WorkloadDetailsLogsComponent
  extends BaseSubscription
  implements OnInit, OnDestroy
{
  @ViewChild('scrollContainer') scrollContainer: ElementRef;
  public content: string[] = [];
  public inCompleteRow: string | null = null;
  private _autoScroll = true;
  private _logSubscription: Subscription;

  @ViewChild('codeEditor', { static: false }) codeEditor: CodemirrorComponent;

  public code = 'EnemeneMuh';

  readonly codemirrorOptions = {
    lineNumbers: true,
    theme: 'material-darker',
    mode: { name: 'javascript', typescript: true },
  };

  constructor(
    private readonly _workloadService: WorkloadService,
    private readonly _router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    if (this._workloadService.selectedResource$.value !== 'pod') {
      this._router.navigate(['../describe']);
    }

    this._subscriptions.add(
      this._workloadService.selectedWorkload$
        .pipe(
          tap(() => {
            this.content = [];
            this.inCompleteRow = null;
            this._logSubscription?.unsubscribe();
          })
        )
        .subscribe((workload) => {
          this._logSubscription = this._workloadService
            .podLogs(workload.metadata.namespace, workload.metadata.name)
            .subscribe({
              next: (data) => {
                if (data === '' || typeof data !== 'string') return;

                // If a row was incomplete in the last event we need to attach it in front of the next event
                if (this.inCompleteRow !== null) {
                  data = this.inCompleteRow + data;
                  this.inCompleteRow = null;
                }

                // An event that doesn't end with a newline is incomplete and needs to be stored for the next event
                if (!data.endsWith('\n')) {
                  this.inCompleteRow = data.split('\n').pop();
                }

                // Split the data into lines and format each line
                data.split('\n').forEach((line: string) => {
                  line = this.transformLogRow(line);
                  if (!line || line === '' || line === null) return;
                  this.content.push(line);
                  setTimeout(() => {
                    if (this._autoScroll) {
                      this.scrollContainer.nativeElement.scrollTop =
                        this.scrollContainer.nativeElement.scrollHeight;
                    }
                  }, 20);
                });

                if (this.inCompleteRow !== null) {
                  this.content.pop();
                }
              },
              error: (error) => {},
            });
        })
    );
  }

  ngOnDestroy(): void {
    this._logSubscription?.unsubscribe();
    super.ngOnDestroy();
  }

  public scrolling(event: Event): void {
    const target = event.target as HTMLElement;

    // Check if scrolled to bottom
    const isScrolledToBottom =
      Math.abs(target.scrollTop + target.clientHeight - target.scrollHeight) <
      1;

    if (isScrolledToBottom) {
      this._autoScroll = true;
    } else {
      this._autoScroll = false;
    }
  }

  private transformLogRow(log: string): string {
    // Extract the timestamp from the start of the log string.
    const timestampPattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{9}Z/;
    const matches = log.match(timestampPattern);
    log = log.replace(timestampPattern, '');

    let timestamp: Moment | null = matches ? moment(matches[0]) : null;

    // Get the loglevel and colorize it
    const logLevelPattern = /[WEIDF]\d{4}/;
    const logLevel = log.match(logLevelPattern)?.[0]?.[0];

    let color;

    switch (logLevel) {
      case 'W':
        color = 'orange';
        break;
      case 'E':
        color = 'red';
        break;
      case 'I':
        color = 'lightgray';
        break;
      case 'D':
        color = 'blue';
        break;
      case 'F':
        color = 'purple';
        break;
      default:
        color = 'lightgray';
        break;
    }
    if (!log) return '';
    return `<span style="color: ${color}"><span style="opacity:0.5"> ${
      timestamp?.format('YYYY-MM-DD HH:mm:ss') ?? ''
    }</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${log}</span>`;
  }
}
