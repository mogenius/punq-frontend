import { RequestMethodEnum } from '@pq/core/request-method-enum';
import pkg from '../../package.json';

export const getWsUrl = (path?: string): string => {
  const protocol = window.location.protocol.toLowerCase();
  const domain = window.location.hostname.toLowerCase();
  const port = window.location.port.toLowerCase();
  let wsProtocol = 'ws';
  if (protocol.startsWith('https')) {
    wsProtocol = `wss`;
  }

  return `${wsProtocol}://${domain}:${port}/${[path].filter((item: string | undefined) => !!item).join('/')}`;
};

const apiUrl = 'https://punq.mogenius.dev/backend';
const wsUrl = 'wss://punq.mogenius.dev/websocket';

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
        contentType: 'application/json'
      }
    }
  },
  ws: {
    url: wsUrl
  },
  userService: {
    url: apiUrl,
    port: null,
    login: {
      endPoint: 'auth/login',
      method: RequestMethodEnum.POST,
      header: {
        contentType: 'application/json'
      }
    },
    authenticate: {
      endPoint: 'auth/authenticate',
      method: RequestMethodEnum.GET,
      header: {
        contentType: 'application/json'
      }
    },
    user: {
      endPoint: 'user/',
      method: RequestMethodEnum.GET,
      header: {
        contentType: 'application/json'
      }
    },
    deleteUser: {
      endPoint: (id: string) => `user/${id}`,
      method: RequestMethodEnum.DELETE,
      header: {
        contentType: 'application/json'
      }
    },
    allUsers: {
      endPoint: 'user/all',
      method: RequestMethodEnum.GET,
      header: {
        contentType: 'application/json'
      }
    }
  },
  contextService: {
    url: apiUrl,
    port: null,
    context: {
      validateConfig: {
        endPoint: 'context/validate-config',
        method: RequestMethodEnum.POST,
        header: {
          contentType: 'application/json'
        }
      },
      create: {
        endPoint: 'context',
        method: RequestMethodEnum.POST,
        header: {
          contentType: 'application/json'
        }
      },

      patch: {
        endPoint: 'context',
        method: RequestMethodEnum.PATCH,
        header: {
          contentType: 'application/json'
        }
      },

      list: {
        endPoint: 'context/all',
        method: RequestMethodEnum.GET,
        header: {
          contentType: 'application/json'
        }
      },
      info: {
        endPoint: 'context/info',
        method: RequestMethodEnum.GET,
        header: {
          contentType: 'application/json'
        }
      },
      delete: {
        endPoint: 'context',
        method: RequestMethodEnum.DELETE,
        header: {
          contentType: 'application/json'
        }
      },
      details: {
        endPoint: 'context',
        method: RequestMethodEnum.GET,
        header: {
          contentType: 'application/json'
        }
      },
      providers: {
        endPoint: 'providers',
        method: RequestMethodEnum.GET,
        header: {
          contentType: 'application/json'
        }
      }
    },
    workload: {
      availableResources: {
        endPoint: 'workload/available-resources',
        method: RequestMethodEnum.GET,
        header: {
          contentType: 'application/json'
        }
      },

      templates: {
        endPoint: 'workload/templates',
        method: RequestMethodEnum.GET,
        header: {
          contentType: 'application/json'
        }
      },
      workloads: {
        endPoint: (workload: string) => `workload/${workload}/`,
        method: RequestMethodEnum.GET,
        header: {
          contentType: 'application/json'
        }
      },
      updateWorkload: {
        endPoint: (workload: string) => `workload/${workload}/`,
        method: RequestMethodEnum.PATCH,
        header: {
          contentType: 'application/json'
        }
      },
      podLogs: {
        endPoint: (namespace: string, name: string) => `workload/pod/logs/${namespace}/${name}`,
        method: RequestMethodEnum.PATCH,
        header: {
          contentType: 'application/json'
        }
      },
      describe: {
        endPoint: (workload: string, name: string, namespace?: string) =>
          `workload/${workload}/describe${!!namespace ? `/${namespace}` : ''}/${name}`,
        method: RequestMethodEnum.GET,
        header: {
          contentType: 'application/json'
        }
      },
      deleteWorkload: {
        endPoint: (workload: string, name: string, namespace?: string) =>
          `workload/${workload}${!!namespace ? `/${namespace}` : ''}/${name}`,
        method: RequestMethodEnum.DELETE,
        header: {
          contentType: 'application/json'
        }
      }
    }
  }
};
