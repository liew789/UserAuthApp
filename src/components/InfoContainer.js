import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../colorStore/Colors';

const InfoContainer = ({
  label,
  value,
  formatDate = false,
}) => {

  const formatDateValue = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const displayValue = formatDate ? formatDateValue(value) : value || '-';

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{displayValue}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textTertiary,
    flex: 1,
  },
  value: {
    fontSize: 14,
    color: colors.textPrimary,
    flex: 2,
    textAlign: 'right',
  },
});

export default InfoContainer;
