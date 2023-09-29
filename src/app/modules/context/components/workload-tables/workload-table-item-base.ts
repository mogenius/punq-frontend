import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContextService } from '@pq/context/services/context.service';
import { WorkloadService } from '@pq/context/services/workload.service';
import { BannerStateEnum } from '@pq/core/banner-state.enum';
import { BannerService } from '@pq/shared/services/banner.service';
import moment from 'moment';

@Component({
  template: '--- WORKLOAD TABLE ITEM BASE ---',
})
export class WorkloadTableItemBase implements OnInit {
  @Input() public workload: any = {};

  constructor(
    private readonly _workloadService: WorkloadService,
    private readonly _contextService: ContextService,
    private readonly _router: Router,
    private readonly _bannerService: BannerService
  ) {}

  public ngOnInit(): void {}

  public deleteItem(): void {
    this._workloadService.deleteWorkload(this.workload).subscribe(() => {
      this._bannerService.addBanner(
        BannerStateEnum.success,
        'Workload Deleted',
        3000
      );
    });
  }

  public selectWorkload(): void {
    this._router.navigate([
      '/',
      'context',
      this._contextService.currentContext$.value.id,
      'workloads',
      this._workloadService.selectedResource$.value,
      this.workload.metadata.name,
    ]);
  }

  public calcDuration(start: string, end: string): string {
    const startDate = moment(start);
    const endDate = moment(end);
    const duration = moment.duration(endDate.diff(startDate));
    return duration.seconds() + 's';
  }

  public extractNumericValue(value: string): number {
    return Number(value.replace(/[^0-9.-]+/g, ''));
  }

  public calcAge(date: string): string {
    return moment(date).fromNow(true);
  }
}
