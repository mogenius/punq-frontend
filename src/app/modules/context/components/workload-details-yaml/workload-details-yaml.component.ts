import { Component } from '@angular/core';
import { WorkloadService } from '@pq/context/services/workload.service';
import { BaseSubscription } from '@pq/core/base-subscription';
import { BehaviorSubject, filter } from 'rxjs';
import YAML from 'yaml';

@Component({
  selector: 'pq-workload-details-yaml',
  templateUrl: './workload-details-yaml.component.html',
  styleUrls: ['./workload-details-yaml.component.scss'],
})
export class WorkloadDetailsYamlComponent extends BaseSubscription {
  public content: string = '';
  private stringBackup = '';

  constructor(private readonly _workloadService: WorkloadService) {
    super();
  }

  ngOnInit(): void {
    this._subscriptions.add(
      this._workloadService.selectedWorkload$.subscribe((workload) => {
        this.content = YAML.stringify(workload);
        this.stringBackup = this.content;
      })
    );

    this._subscriptions.add(
      this._workloadService.unsafedModification$
        .pipe(filter((value) => value === null))
        .subscribe(() => {
          this.content = this.stringBackup;
        })
    );
  }

  public onFocusChange(event: any): void {
    this._workloadService.isEditorFocus$.next(event);
  }

  public onModelChange(event: any): void {
    if (this.stringBackup === event) {
      this._workloadService.unsafedModification$.next(null);
    } else {
      this._workloadService.unsafedModification$.next(event);
    }
  }

  get selectedWorkload$(): BehaviorSubject<any> {
    return this._workloadService.selectedWorkload$;
  }
}
