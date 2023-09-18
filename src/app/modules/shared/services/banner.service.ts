import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BannerStateEnum } from '@pq/core/banner-state.enum';
import { IBanner } from '@pq/core/banner.interface';

import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BannerService {
  private _banners: IBanner[] = [];
  private _subscriptions: Subscription;

  constructor(@Inject(PLATFORM_ID) protected readonly _platform: string) {
    if (this._subscriptions) {
      this._subscriptions.unsubscribe();
    }
    this._subscriptions = new Subscription();
  }

  public addBanner(
    state: BannerStateEnum,
    content: string,
    duration: number
  ): void {
    const id = Math.random().toString(36).substring(2);

    this._banners.push({
      id: id,
      content: content,
      state: state,
      duration: duration,
    });

    setTimeout(() => {
      this.removeBanner(id);
    }, duration);
  }

  public removeBanner(id: string): void {
    this._banners = this._banners.filter((banner) => banner.id !== id);
  }

  public get banners(): IBanner[] {
    return this._banners;
  }
}
