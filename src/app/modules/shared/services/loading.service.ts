import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private _errorState: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);
  private _isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor() {}

  get errorState$(): BehaviorSubject<string | null> {
    return this._errorState;
  }

  get isLoading$(): BehaviorSubject<boolean> {
    return this._isLoading;
  }
}
