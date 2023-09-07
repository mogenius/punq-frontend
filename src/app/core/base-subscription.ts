import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'mo-base-form',
  template: '<div>-- BASE-SUBSCRIPTION --</div>',
})
export abstract class BaseSubscription implements OnDestroy {
  protected _subscriptions: Subscription = new Subscription();

  protected addSubscription(subscription: Subscription): void {
    this._subscriptions.add(subscription);
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }
}
