import { RequestMethodEnum } from '@pq/core/request-method-enum';
import pkg from '../../package.json';

const apiUrl = 'https://punq.mogenius.dev';

export const baseEnvironment = {
  stage: 'dev',
  version: pkg.version,
  userService: {
    url: apiUrl,
    port: null,
    login: {
      endPoint: 'auth/login',
      method: RequestMethodEnum.POST,
      header: {
        contentType: 'application/json',
      },
    },
    authenticate: {
      endPoint: 'auth/authenticate',
      method: RequestMethodEnum.GET,
      header: {
        contentType: 'application/json',
      },
    },
  },
  clusterService: {
    url: apiUrl,
    port: null,
  },
};
