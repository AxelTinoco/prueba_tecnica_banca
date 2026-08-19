import { useRouter } from 'expo-router';
import { ActivityIndicator, FlatList, Pressable, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AccountCard } from '@/components/AccountCard';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Brand, MaxContentWidth, Spacing } from '@/constants/theme';
import { useAccounts } from '@/hooks/useAccounts';
import type { Account } from '@/models/Account';

export default function AccountsScreen() {
  const { accounts, loading, refreshing, error, refetch } = useAccounts();
  const router = useRouter();

  const handlePress = (account: Account) => {
    router.push({
      pathname: '/accounts/[id]',
      params: {
        id: account.id,
        number: account.number,
        type: account.type,
        balance: account.balance,
      },
    });
  };

  const renderEmpty = () => {
    if (loading) {
      return (
        <View style={styles.placeholder}>
          <ActivityIndicator size="large" color={Brand.blue} />
          <ThemedText type="small" themeColor="textSecondary">
            Cargando tus cuentas…
          </ThemedText>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.placeholder}>
          <ThemedText type="default" style={styles.errorText}>
            {error}
          </ThemedText>
          <Pressable
            onPress={refetch}
            accessibilityRole="button"
            style={({ pressed }) => [styles.retry, pressed && styles.retryPressed]}>
            <Text style={styles.retryLabel}>Reintentar</Text>
          </Pressable>
        </View>
      );
    }

    return (
      <View style={styles.placeholder}>
        <ThemedText type="default" themeColor="textSecondary" style={styles.errorText}>
          Todavía no tienes cuentas registradas.
        </ThemedText>
      </View>
    );
  };

  return (
    <ThemedView style={styles.screen}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <FlatList
          data={accounts}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <AccountCard account={item} onPress={handlePress} />}
          contentContainerStyle={[styles.list, accounts.length === 0 && styles.listGrow]}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={refetch} tintColor={Brand.blue} />
          }
          ListHeaderComponent={
            <View style={styles.header}>
              <ThemedText type="subtitle">Mis cuentas</ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                Desliza hacia abajo para actualizar
              </ThemedText>
            </View>
          }
          ListEmptyComponent={renderEmpty}
        />
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
  },
  list: {
    padding: Spacing.three,
    paddingBottom: Spacing.five,
  },
  listGrow: {
    flexGrow: 1,
  },
  header: {
    gap: Spacing.one,
    marginBottom: Spacing.four,
  },
  separator: {
    height: Spacing.three,
  },
  placeholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.three,
    paddingBottom: Spacing.six,
  },
  errorText: {
    textAlign: 'center',
  },
  retry: {
    backgroundColor: Brand.blue,
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.five,
    borderRadius: 12,
  },
  retryPressed: {
    backgroundColor: Brand.bluePressed,
  },
  retryLabel: {
    color: Brand.onBlue,
    fontWeight: '600',
    fontSize: 15,
  },
});
