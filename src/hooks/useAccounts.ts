import axios from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';

import type { Account } from '@/models/Account';
import { getAccounts } from '@/services/accountService';
import { getErrorMessage } from '@/services/httpError';

export function useAccounts() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const controllerRef = useRef<AbortController | null>(null);

  const load = useCallback(async (isRefresh = false) => {
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;

    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    setError(null);

    try {
      const data = await getAccounts(controller.signal);
      setAccounts(data);
    } catch (err) {
      if (axios.isCancel(err)) return;
      setError(getErrorMessage(err));
    } finally {
      // si se canceló, la petición que la reemplazó maneja los flags
      if (!controller.signal.aborted) {
        setLoading(false);
        setRefreshing(false);
      }
    }
  }, []);

  useEffect(() => {
    load();
    return () => controllerRef.current?.abort();
  }, [load]);

  const refetch = useCallback(() => load(true), [load]);

  return { accounts, loading, refreshing, error, refetch };
}
