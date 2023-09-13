import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContextService } from '../services/context.service';

@Injectable()
export class ContextInterceptor implements HttpInterceptor {
  constructor(private readonly _contextService: ContextService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (!!this._contextService.currentContext$.value?.id) {
      request = request.clone({
        setHeaders: {
          'X-Context-Id': this._contextService.currentContext$.value?.id ?? '',
        },
      });
    }
    return next.handle(request);
  }
}
