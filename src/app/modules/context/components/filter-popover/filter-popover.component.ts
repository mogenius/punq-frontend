import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { WorkloadService } from '@pq/context/services/workload.service';

@Component({
  selector: 'pq-filter-popover',
  templateUrl: './filter-popover.component.html',
  styleUrls: ['./filter-popover.component.scss'],
})
export class FilterPopoverComponent implements OnInit {
  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  private readonly _namespaceControl: FormControl = new FormControl({
    value: undefined,
    disabled: false,
  });

  private readonly _filterControl: FormControl = new FormControl({
    value: undefined,
    disabled: false,
  });

  constructor(private readonly _workloadService: WorkloadService) {}

  ngOnInit(): void {
    this._namespaceControl.setValue(
      this._workloadService.filter$.value?.namespace ?? undefined
    );
    this._filterControl.setValue(
      this._workloadService.filter$.value?.string ?? undefined
    );
  }

  public applyFilter(): void {
    this._workloadService.filter$.next({
      namespace: this._namespaceControl.value ?? null,
      string: this._filterControl.value ?? null,
    });

    this.close.emit();
  }

  public resetFilter(): void {
    this._namespaceControl.setValue(undefined);
    this._filterControl.setValue(undefined);
    this.applyFilter();
  }

  get namespaces$(): any {
    return this._workloadService.namespaces$;
  }

  get namespaceControl(): FormControl {
    return this._namespaceControl;
  }

  get filterControl(): FormControl {
    return this._filterControl;
  }
}
