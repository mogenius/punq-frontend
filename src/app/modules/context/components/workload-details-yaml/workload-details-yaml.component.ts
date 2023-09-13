import { Component, ViewChild } from '@angular/core';
import { CodemirrorComponent } from '@ctrl/ngx-codemirror';
import { WorkloadService } from '@pq/context/services/workload.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'pq-workload-details-yaml',
  templateUrl: './workload-details-yaml.component.html',
  styleUrls: ['./workload-details-yaml.component.scss'],
})
export class WorkloadDetailsYamlComponent {
  constructor(private readonly _workloadService: WorkloadService) {}

  ngOnInit(): void {
    this.content = JSON.stringify(
      this._workloadService.selectedWorkload$.value,
      null,
      '\t'
    );
  }

  public content: string = '### workload-details-logs works!';

  @ViewChild('codeEditor', { static: false }) codeEditor: CodemirrorComponent;

  public code = 'EnemeneMuh';

  get selectedWorkload$(): BehaviorSubject<any> {
    return this._workloadService.selectedWorkload$;
  }
}
