import { Component, OnInit } from '@angular/core';
import { ContextService } from '@pq/context/services/context.service';
import { BehaviorSubject, map } from 'rxjs';

@Component({
  selector: 'pq-context-header-bar',
  templateUrl: './context-header-bar.component.html',
  styleUrls: ['./context-header-bar.component.scss'],
})
export class ContextHeaderBarComponent implements OnInit {
  constructor(private readonly _contextService: ContextService) {}

  ngOnInit(): void {
    const stats = this._contextService.contextInfo$.pipe(
      map((info) => {
        return info.nodeStats.reduce((acc = 0, curr: any) => {
          return acc + curr.cpus;
        });
      })
    );
  }

  get contextInfo$(): BehaviorSubject<any> {
    return this._contextService.contextInfo$;
  }

  get cpuTotal(): number {
    return this._contextService.contextInfo$.value?.nodeStats.reduce(
      (acc: any, stat: any) => acc + stat.cpus,
      0
    );
  }

  get ramTotal(): number {
    return this._contextService.contextInfo$.value?.nodeStats.reduce(
      (acc: any, stat: any) => acc + stat.memoryInBytes,
      0
    );
  }

  get cpuInUse(): string {
    return (
      (this._contextService.contextInfo$.value?.clusterStatus.cpu /
        (this.cpuTotal * 1000)) *
      100
    ).toFixed(2);
  }

  get ramInUse(): string {
    return (
      (this._contextService.contextInfo$.value?.clusterStatus.memoryInBytes /
        this.ramTotal) *
      100
    ).toFixed(2);
  }

  get storageTotal(): number {
    return this._contextService.contextInfo$.value?.nodeStats.reduce(
      (acc: any, stat: any) => acc + stat.ephemeralInBytes,
      0
    );
  }

  get storageInUse(): string {
    return (
      (this._contextService.contextInfo$.value?.clusterStatus
        .ephemeralStorageLimitInBytes /
        this.storageTotal) *
      100
    ).toFixed(2);
  }

  get currentContext$(): BehaviorSubject<any> {
    return this._contextService.currentContext$;
  }
}
