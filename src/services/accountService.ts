import { api } from './api';
import type { Account } from '@/models/Account';

export async function getAccounts(signal?: AbortSignal) {
  const { data } = await api.get<Account[]>('/api/accounts', { signal });
  return data;
}
