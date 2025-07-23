import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import useTheme from '@/hooks/useTheme';
import { LinearGradient } from 'expo-linear-gradient';
import { createSettingsStyles } from '@/assets/styles/setting.styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import ProgressStats from '@/components/ProgressStats';
import Preferences from '@/components/Preferences';
import DangerZone from '@/components/DangerZone';


const SettingScreen = () => {


  const {colors}=useTheme()

  const settingStyles = createSettingsStyles(colors)

  return (
    <LinearGradient colors={colors.gradients.background} style={settingStyles.container}>
      <SafeAreaView style={settingStyles.safeArea}>
        {/* Header */}
        <View style={settingStyles.header}>
          <View style={settingStyles.titleContainer}>
            <LinearGradient colors={colors.gradients.primary} style={settingStyles.iconContainer}>
              <Ionicons name='settings' size={28} color="#fff"></Ionicons>
            </LinearGradient>
            <Text style={settingStyles.title}>Settings</Text>
          </View>

        </View>

        {/* body section */}
        <ScrollView
        style={settingStyles.scrollView}
        contentContainerStyle={settingStyles.content}
        showsVerticalScrollIndicator={false}
        >
          <ProgressStats/>

          {/* preferences */}
          <Preferences/>

          <DangerZone/>
        </ScrollView>

      </SafeAreaView>
    </LinearGradient>
  )
}

export default SettingScreen
