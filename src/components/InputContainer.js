import React, { useState } from 'react';
import { TextInput, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { colors } from '../colorStore/Colors';
import { EyeOutlineIcon, EyeOffOutlineIcon, CloseIcon } from '../assets/CommonSVG';

const InputContainer = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
  autoCorrect = true,
  placeholderTextColor = colors.textPlaceholder,
  style,
  label,
  error,
  showPasswordToggle = false,
  maxLength,
  ...props
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleClear = () => {
    onChangeText('');
  };

  const showClearButton = value && value.length > 0;
  const hasIcons = showPasswordToggle || showClearButton;
  const hasBothIcons = showPasswordToggle && showClearButton;

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputWrapper}>
        <TextInput
          style={[
            styles.input,
            error && styles.inputError,
            hasIcons && styles.inputWithIcon,
            hasBothIcons && styles.inputWithBothIcons,
            style,
          ]}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          maxLength={maxLength}
          {...props}
        />
        {showClearButton && (
          <TouchableOpacity
            style={[
              styles.clearIconContainer,
              showPasswordToggle && styles.clearIconWithPassword,
            ]}
            onPress={handleClear}
            activeOpacity={0.7}>
            <CloseIcon color={colors.textTertiary} />
          </TouchableOpacity>
        )}
        {showPasswordToggle && (
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={togglePasswordVisibility}
            activeOpacity={0.7}>
            {isPasswordVisible ? (
              <EyeOutlineIcon color={colors.textTertiary} />
            ) : (
              <EyeOffOutlineIcon color={colors.textTertiary} />
            )}
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  inputWrapper: {
    position: 'relative',
  },
  input: {
    backgroundColor: colors.backgroundLight,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: colors.border,
    color: colors.textPrimary,
  },
  inputWithIcon: {
    paddingRight: 50,
  },
  inputWithBothIcons: {
    paddingRight: 84,
  },
  iconContainer: {
    position: 'absolute',
    right: 16,
    top: '20%',
    padding: 4,
  },
  clearIconContainer: {
    position: 'absolute',
    right: 16,
    top: '20%',
    padding: 4,
  },
  clearIconWithPassword: {
    right: 50,
  },
  inputError: {
    borderColor: colors.error,
  },
  errorText: {
    fontSize: 12,
    color: colors.error,
    marginTop: 4,
    marginLeft: 4,
  },
});

export default InputContainer;

