import { Component, OnInit, ViewChild } from '@angular/core';
import { CodemirrorComponent } from '@ctrl/ngx-codemirror';
import { ContextService } from '@pq/context/services/context.service';
import { WorkloadService } from '@pq/context/services/workload.service';
import { MiscService } from '@pq/shared/services/misc.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'pq-workload-details-describe',
  templateUrl: './workload-details-describe.component.html',
  styleUrls: ['./workload-details-describe.component.scss'],
})
export class WorkloadDetailsDescribeComponent implements OnInit {
  constructor(
    private readonly _workloadService: WorkloadService,
    private readonly _miscService: MiscService
  ) {}

  ngOnInit(): void {
    this.content = JSON.stringify(
      this._workloadService.selectedWorkload$.value,
      null,
      '\t'
    );

    this._workloadService
      .describe(
        this._workloadService.selectedResource$.value,
        this._workloadService.selectedWorkload$.value?.metadata?.name ??
          undefined,
        this._workloadService.selectedWorkload$.value?.metadata?.namespace ??
          undefined
      )
      .subscribe((response: any) => {
        console.log(response);
      });
  }

  public content: string = '### workload-details-logs works!';

  @ViewChild('codeEditor', { static: false }) codeEditor: CodemirrorComponent;

  public code = 'EnemeneMuh';

  get selectedWorkload$(): BehaviorSubject<any> {
    return this._workloadService.selectedWorkload$;
  }

  get designMode$(): BehaviorSubject<string> {
    return this._miscService.designMode$;
  }
}
