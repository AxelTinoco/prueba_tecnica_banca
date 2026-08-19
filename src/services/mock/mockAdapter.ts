import { AxiosError, CanceledError, type AxiosAdapter, type AxiosResponse } from 'axios';

import { ACCOUNTS_MOCK } from './accounts.mock';

const LATENCY_MS = 900;

const routes: Record<string, () => unknown> = {
  'GET /api/accounts': () => ACCOUNTS_MOCK,
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockAdapter: AxiosAdapter = async (config) => {
  const method = (config.method ?? 'get').toUpperCase();
  const url = config.url ?? '';

  await delay(LATENCY_MS);

  if (config.signal?.aborted) {
    throw new CanceledError(undefined, config);
  }

  const handler = routes[`${method} ${url}`];

  if (!handler) {
    throw new AxiosError(`Ruta no simulada: ${method} ${url}`, AxiosError.ERR_BAD_REQUEST, config, null, {
      status: 404,
      statusText: 'Not Found',
      data: null,
      headers: {},
      config,
    } as AxiosResponse);
  }

  return {
    data: handler(),
    status: 200,
    statusText: 'OK',
    headers: {},
    config,
  } as AxiosResponse;
};
