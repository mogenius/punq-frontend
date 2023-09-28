import { Component, Input, OnInit } from '@angular/core';
import { ContextService } from '@pq/context/services/context.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'pq-context-details-sidebar-workload-item',
  templateUrl: './context-details-sidebar-workload-item.component.html',
  styleUrls: ['./context-details-sidebar-workload-item.component.scss'],
})
export class ContextDetailsSidebarWorkloadItemComponent implements OnInit {
  @Input() workload: any;
  @Input() resource: any;

  constructor(private readonly _contextService: ContextService) {}

  ngOnInit(): void {}

  get currentContext$(): BehaviorSubject<any> {
    return this._contextService.currentContext$;
  }
}
