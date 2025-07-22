import { ActivityIndicator, View, Text } from 'react-native'
import React from 'react'
import { createHomeStyles } from '@/assets/styles/setting.styles'
import { LinearGradient } from 'expo-linear-gradient'
import useTheme from '@/hooks/useTheme'
import { SafeAreaView } from 'react-native-safe-area-context'

const LoadingSpinner = () => {
    const { colors } = useTheme();

    const homestyles = createHomeStyles(colors)
    return (
        <SafeAreaView style={homestyles.safeArea}>

            <LinearGradient colors={colors.gradients.background} style={homestyles.container}>
                <View>
                    <ActivityIndicator size="large" color={colors.primary}></ActivityIndicator>
                    <Text style={homestyles.loadingText}>Loading your Tasks...</Text>
                </View>
            </LinearGradient>
        </SafeAreaView>
    )
}

export default LoadingSpinner