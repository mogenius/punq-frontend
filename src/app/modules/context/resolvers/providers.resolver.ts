import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ContextService } from '../services/context.service';

@Injectable({
  providedIn: 'root',
})
export class ProvidersResolver {
  constructor(private readonly _contextService: ContextService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<boolean> {
    this._contextService.providers().subscribe({
      next: (providers) => {},
      error: (error) => {},
    });
    return of(true);
  }
}
