import { useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Brand, MaxContentWidth, Spacing } from '@/constants/theme';
import { formatCurrency } from '@/utils/format';

type DetailParams = {
  id: string;
  number: string;
  type: string;
  balance: string;
};

function groupNumber(number: string) {
  return number.replace(/(\d{4})(?=\d)/g, '$1 ');
}

export default function AccountDetail() {
  const { number, type, balance } = useLocalSearchParams<DetailParams>();

  if (!number) {
    return (
      <ThemedView style={styles.missing}>
        <ThemedText type="default" themeColor="textSecondary">
          No encontramos la cuenta seleccionada.
        </ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <Text style={styles.heroLabel}>Saldo disponible</Text>
          <Text style={styles.heroBalance} numberOfLines={1} adjustsFontSizeToFit>
            {formatCurrency(Number(balance))}
          </Text>
        </View>

        <ThemedView type="backgroundElement" style={styles.details}>
          <Row label="Número de cuenta" value={groupNumber(number)} />
          <Row label="Tipo de cuenta" value={type} />
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <ThemedText type="small" themeColor="textSecondary">
        {label}
      </ThemedText>
      <ThemedText type="default" style={styles.rowValue}>
        {value}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    padding: Spacing.three,
    gap: Spacing.three,
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
  },
  missing: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.four,
  },
  hero: {
    backgroundColor: Brand.blue,
    borderRadius: 20,
    padding: Spacing.four,
    gap: Spacing.one,
  },
  heroLabel: {
    color: Brand.onBlueMuted,
    fontSize: 13,
  },
  heroBalance: {
    color: Brand.onBlue,
    fontSize: 36,
    fontWeight: '700',
  },
  details: {
    borderRadius: 16,
    paddingHorizontal: Spacing.three,
  },
  row: {
    paddingVertical: Spacing.three,
    gap: Spacing.half,
  },
  rowValue: {
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});
