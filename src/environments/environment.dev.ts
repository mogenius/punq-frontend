// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { baseEnvironment } from '@pq/environments/base.environment';
import * as deepmerge from 'deepmerge';

const local = false;

const apiUrl = '/backend/';

export const environment = deepmerge(baseEnvironment, {
  stage: 'develop',
  production: false,
  misc: {
    url: apiUrl,
  },
  userService: {
    url: apiUrl,
  },
  contextService: {
    url: apiUrl,
  },
});

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
