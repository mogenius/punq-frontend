import { RequestMethodEnum } from '@pq/core/request-method-enum';
import pkg from '../../package.json';

const apiUrl = 'https://punq.mogenius.dev';

export const baseEnvironment = {
  stage: 'dev',
  version: pkg.version,
  misc: {
    url: apiUrl,
    port: null,
    version: {
      endPoint: 'version',
      method: RequestMethodEnum.GET,
      header: {
        contentType: 'application/json',
      },
    },
  },
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
    user: {
      endPoint: 'user',
      method: RequestMethodEnum.GET,
      header: {
        contentType: 'application/json',
      },
    },
  },
  contextService: {
    url: apiUrl,
    port: null,
    context: {
      list: {
        endPoint: 'context/all',
        method: RequestMethodEnum.GET,
        header: {
          contentType: 'application/json',
        },
      },
    },
    workload: {
      availableResources: {
        endPoint: 'workload/available-resources',
        method: RequestMethodEnum.GET,
        header: {
          contentType: 'application/json',
        },
      },
      templates: {
        endPoint: 'workload/templates',
        method: RequestMethodEnum.GET,
        header: {
          contentType: 'application/json',
        },
      },
      workloads: {
        endPoint: (workload: string) => `workload/${workload}`,
        method: RequestMethodEnum.GET,
        header: {
          contentType: 'application/json',
        },
      },
      describe: {
        endPoint: (workload: string, name: string, namespace?: string) =>
          `workload/${workload}/describe${
            !!namespace ? `/${namespace}` : ''
          }/${name}`,
        method: RequestMethodEnum.GET,
        header: {
          contentType: 'application/json',
        },
      },
    },
  },
};