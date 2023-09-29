import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ContextService } from '@pq/context/services/context.service';
import { BaseSubscription } from '@pq/core/base-subscription';
import { debounceTime, filter, tap } from 'rxjs';

@Component({
  selector: 'pq-cluster-navigation',
  templateUrl: './cluster-navigation.component.html',
  styleUrls: ['./cluster-navigation.component.scss'],
})
export class ClusterNavigationComponent
  extends BaseSubscription
  implements OnInit
{
  @ViewChild('slider', { static: true }) slider: ElementRef | undefined;

  constructor(
    private elRef: ElementRef,
    private readonly _contextService: ContextService,
    private readonly _router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this._router.events
      .pipe(
        filter((event: any) => event.routerEvent instanceof NavigationEnd),
        debounceTime(50)
      )
      .subscribe((event) => {
        this.moveActiveSlider();
      });
  }

  private moveActiveSlider() {
    const activeLink = this.elRef?.nativeElement?.querySelector('.active');

    if (!this.slider || !this.elRef || !activeLink) {
      setTimeout(() => {
        this.moveActiveSlider();
      }, 100);
    }

    if (activeLink) {
      this.slider!.nativeElement.style.width = activeLink.clientWidth + 'px';
      this.slider!.nativeElement.style.left = activeLink.offsetLeft + 'px';
    }
  }

  get currentContext$(): any {
    return this._contextService.currentContext$;
  }
}
