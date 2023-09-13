import { Component, ViewChild } from '@angular/core';
import { CodemirrorComponent } from '@ctrl/ngx-codemirror';

@Component({
  selector: 'pq-workload-details-logs',
  templateUrl: './workload-details-logs.component.html',
  styleUrls: ['./workload-details-logs.component.scss'],
})
export class WorkloadDetailsLogsComponent {
  public content: string = '### workload-details-logs works!';

  @ViewChild('codeEditor', { static: false }) codeEditor: CodemirrorComponent;

  public code = 'EnemeneMuh';

  readonly codemirrorOptions = {
    lineNumbers: true,
    theme: 'material-darker',
    mode: { name: 'javascript', typescript: true },
  };
}
