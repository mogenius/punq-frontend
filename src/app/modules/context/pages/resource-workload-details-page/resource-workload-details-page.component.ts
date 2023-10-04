import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ContextService } from '@pq/context/services/context.service';
import { WorkloadService } from '@pq/context/services/workload.service';
import { BaseSubscription } from '@pq/core/base-subscription';
import { WorkloadNavigationEnum } from '@pq/core/workload-navigation.enum';
import { BehaviorSubject, debounceTime, filter, startWith } from 'rxjs';

@Component({
  selector: 'pq-resource-workload-details-page',
  templateUrl: './resource-workload-details-page.component.html',
  styleUrls: ['./resource-workload-details-page.component.scss'],
})
export class ResourceWorkloadDetailsPageComponent
  extends BaseSubscription
  implements OnDestroy
{
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'ArrowRight') {
      if (this._workloadService.isEditorFocus$.value) {
        return;
      }
      const navItems = this.getAvailableNavigation();
      const currentNav = this._router.url.split('/').pop();
      const currentIndex = navItems.indexOf(currentNav?.toUpperCase() as any);
      const nextNav =
        navItems[currentIndex + 1] ?? navItems[navItems.length - 1];

      const newRoute = this._router.url.replace(
        currentNav!.toLowerCase(),
        nextNav.toLowerCase()
      );
      this._router.navigateByUrl(newRoute);
    }

    if (event.key === 'ArrowLeft') {
      if (this._workloadService.isEditorFocus$.value) {
        return;
      }
      const navItems = this.getAvailableNavigation();
      const currentNav = this._router.url.split('/').pop();
      const currentIndex = navItems.indexOf(currentNav?.toUpperCase() as any);
      const nextNav = navItems[currentIndex - 1] ?? navItems[0];

      const newRoute = this._router.url.replace(
        currentNav!.toLowerCase(),
        nextNav.toLowerCase()
      );
      this._router.navigateByUrl(newRoute);
    }

    if (event.key === 'Escape') {
      this._router.navigate(
        [
          'context',
          this._contextService.currentContext$.value.id,
          'workloads',
          this._workloadService.selectedResource$.value,
        ],
        {
          queryParams: {
            focus: this._workloadService.selectedWorkload$.value.metadata.name,
          },
        }
      );
    }

    if (event.key === 's' && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      if (this._workloadService.unsafedModification$.value !== null) {
        this.saveWorkload();
      }
    }
  }

  @ViewChild('workloadNav') public workloadNav: ElementRef;

  constructor(
    private readonly _workloadService: WorkloadService,
    private readonly _contextService: ContextService,
    private readonly _router: Router
  ) {
    super();
  }

  ngOnDestroy(): void {
    this._workloadService.selectedWorkload$.next(null);
    super.ngOnDestroy();
  }

  ngOnInit(): void {
    this._subscriptions.add(
      this._router.events
        .pipe(
          filter((event) => event instanceof NavigationEnd),
          startWith(null),
          debounceTime(20)
        )
        .subscribe(() => {
          this.moveSlider();
        })
    );
  }

  private moveSlider(): void {
    const nav = this.workloadNav?.nativeElement;
    const navItem = nav?.querySelector('.active');
    const slider = nav?.querySelector('.active-slider');

    if (!navItem || !slider || !nav) {
      setTimeout(() => {
        this.moveSlider();
      }, 10);
      return;
    }

    const navItemWidth = navItem.offsetWidth;
    const navItemLeft = navItem.offsetLeft;
    slider.style.width = `${navItemWidth}px`;
    slider.style.left = `${navItemLeft}px`;
  }

  public saveWorkload(): void {
    this._workloadService.saveModifications().subscribe({
      next: (response) => {
        console.log('NEXT');

        console.log(response);
      },
      error: (error) => {
        console.log(error);
        console.log('ERRPR');
      },
    });
  }

  public getAvailableNavigation(): WorkloadNavigationEnum[] {
    const availableNavigation: WorkloadNavigationEnum[] = [];

    if (this._workloadService.selectedResource$.value === 'Pod') {
      availableNavigation.push(WorkloadNavigationEnum.LOGS);
    }
    availableNavigation.push(WorkloadNavigationEnum.DESCRIBE);
    availableNavigation.push(WorkloadNavigationEnum.YAML);

    return availableNavigation;
  }

  public discard(): void {
    this._workloadService.unsafedModification$.next(null);
  }

  get workloadNavigationEnum(): typeof WorkloadNavigationEnum {
    return WorkloadNavigationEnum;
  }

  get workloadNavigationEnumAll(): string[] {
    return Object.keys(WorkloadNavigationEnum);
  }

  get unsafedModification$(): BehaviorSubject<string | null> {
    return this._workloadService.unsafedModification$;
  }
}
