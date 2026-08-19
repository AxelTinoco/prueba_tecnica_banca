import axios from 'axios';

import { mockAdapter } from './mock/mockAdapter';

const USE_MOCK = process.env.EXPO_PUBLIC_USE_MOCK !== 'false';

export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL ?? 'https://api.banca.local',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
  ...(USE_MOCK ? { adapter: mockAdapter } : {}),
});
