import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { WorkloadService } from '../services/workload.service';
import { Observable, map, of, tap } from 'rxjs';
import { UserService } from '@pq/user/services/user.service';

@Injectable({
  providedIn: 'root',
})
export class MembersResolver {
  constructor(private readonly _userService: UserService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this._userService.allUsers();
  }
}
