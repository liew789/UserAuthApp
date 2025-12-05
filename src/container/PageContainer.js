import React from "react";
import { View, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../colorStore/Colors';

export const PageContainer = props => {

    const { children, addStyle } = props;
    const insets = useSafeAreaInsets();

    return (
        <KeyboardAvoidingView
            style={styles.keyboardAvoidingView}
            behavior={Platform.OS === "ios" ? "padding" : null}>
            <View
                style={[
                    styles.container,
                    addStyle ? addStyle : {}
                ]}>
                {children}
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    keyboardAvoidingView: {
        flex: 1
    },
    container: {
        flex: 1,
        backgroundColor: colors.background,
    }
});
