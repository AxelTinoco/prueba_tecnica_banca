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

  const handlePress = (account: Account) => {
    console.log('cuenta seleccionada', account.id);
  };

  if (loading) {
    return (
      <ThemedView style={styles.centered}>
        <ActivityIndicator size="large" color={Brand.blue} />
        <ThemedText type="small" themeColor="textSecondary">
          Cargando tus cuentas…
        </ThemedText>
      </ThemedView>
    );
  }

  if (error && accounts.length === 0) {
    return (
      <ThemedView style={styles.centered}>
        <ThemedText type="default" style={styles.errorText}>
          {error}
        </ThemedText>
        <Pressable
          onPress={refetch}
          accessibilityRole="button"
          style={({ pressed }) => [styles.retry, pressed && styles.retryPressed]}>
          <Text style={styles.retryLabel}>Reintentar</Text>
        </Pressable>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.screen}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <FlatList
          data={accounts}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <AccountCard account={item} onPress={handlePress} />}
          contentContainerStyle={styles.list}
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
          ListEmptyComponent={
            <ThemedText type="default" themeColor="textSecondary" style={styles.empty}>
              Todavía no tienes cuentas registradas.
            </ThemedText>
          }
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
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.three,
    padding: Spacing.four,
  },
  list: {
    padding: Spacing.three,
    paddingBottom: Spacing.five,
  },
  header: {
    gap: Spacing.one,
    marginBottom: Spacing.four,
  },
  separator: {
    height: Spacing.three,
  },
  empty: {
    textAlign: 'center',
    marginTop: Spacing.five,
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
