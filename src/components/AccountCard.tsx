import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';

import { Brand, Spacing } from '@/constants/theme';
import type { Account } from '@/models/Account';
import { formatCurrency, maskAccountNumber } from '@/utils/format';

type Props = {
  account: Account;
  onPress?: (account: Account) => void;
};

export function AccountCard({ account, onPress }: Props) {
  const balance = formatCurrency(account.balance);

  return (
    <Pressable
      onPress={() => onPress?.(account)}
      disabled={!onPress}
      accessibilityRole="button"
      accessibilityLabel={`${account.type}, terminación ${account.number.slice(-4)}, saldo ${balance}`}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}>
      <View style={styles.header}>
        <Text style={styles.type}>{account.type}</Text>
        <Text style={styles.number}>{maskAccountNumber(account.number)}</Text>
      </View>

      <Text style={styles.label}>Saldo disponible</Text>
      <Text style={styles.balance} numberOfLines={1} adjustsFontSizeToFit>
        {balance}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Brand.blue,
    borderRadius: 20,
    padding: Spacing.four,
    gap: Spacing.one,
    ...Platform.select({
      web: { boxShadow: '0 6px 12px rgba(0, 0, 0, 0.18)' },
      default: {
        shadowColor: '#000',
        shadowOpacity: 0.18,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 6 },
        elevation: 4,
      },
    }),
  },
  cardPressed: {
    backgroundColor: Brand.bluePressed,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.two,
  },
  type: {
    color: Brand.onBlue,
    fontSize: 16,
    fontWeight: '600',
  },
  number: {
    color: Brand.onBlueMuted,
    fontSize: 14,
    letterSpacing: 1,
  },
  label: {
    color: Brand.onBlueMuted,
    fontSize: 13,
  },
  balance: {
    color: Brand.onBlue,
    fontSize: 30,
    fontWeight: '700',
  },
});
