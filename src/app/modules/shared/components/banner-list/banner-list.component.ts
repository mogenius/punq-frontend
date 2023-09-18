import {
  trigger,
  transition,
  style,
  animate,
  sequence,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { IBanner } from '@pq/core/banner.interface';
import { BannerService } from '@pq/shared/services/banner.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'pq-banner-list',
  templateUrl: './banner-list.component.html',
  styleUrls: ['./banner-list.component.scss'],
  animations: [
    trigger('fadeSlideInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('500ms', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      transition(':leave', sequence([animate('500ms', style({ opacity: 0 }))])),
    ]),
  ],
})
export class BannerListComponent implements OnInit {
  constructor(private readonly _bannerService: BannerService) {}

  private _subscriptions: Subscription;

  ngOnInit(): void {
    if (!!this._subscriptions) {
      this._subscriptions.unsubscribe();
    }
    this._subscriptions = new Subscription();
  }

  ngOnDestroy(): void {
    if (!!this._subscriptions) {
      this._subscriptions.unsubscribe();
    }
  }

  get banners(): IBanner[] {
    return this._bannerService.banners.slice(-4);
  }
}
