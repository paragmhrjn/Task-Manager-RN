import { View, Text, Switch } from 'react-native'
import React, { useState } from 'react'
import useTheme from '@/hooks/useTheme';
import { createSettingsStyles } from '@/assets/styles/setting.styles';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const Preferences = () => {
    const [autoSync, setAutoSync] = useState(true);
    const [notificationEnabled, setNotificationEnabled] = useState(true)

    const { colors, isDarkMode, toggleDarkMode } = useTheme()

    const settingStyles = createSettingsStyles(colors)
  return (
    <LinearGradient colors={colors.gradients.surface}  style={settingStyles.section}>
      <Text style={settingStyles.sectionTitle}>Preferences</Text>
        {/* Dark Mode */}
      <View style={settingStyles.settingItem}>
        <View style={settingStyles.settingLeft}>
            <LinearGradient colors={colors.gradients.primary} style={settingStyles.settingIcon}>
                <Ionicons name='moon' size={18} color="#fff"></Ionicons>
            </LinearGradient>
            <Text style={settingStyles.settingText}>Dark Mode</Text>
        </View>
        <Switch
        value={isDarkMode} 
        onValueChange={toggleDarkMode}
        thumbColor={"#fff"}
        trackColor={{false:colors.border, true: colors.primary}}
        />
      </View>
        {/* Notification */}
      <View style={settingStyles.settingItem}>
        <View style={settingStyles.settingLeft}>
            <LinearGradient colors={colors.gradients.warning} style={settingStyles.settingIcon}>
                <Ionicons name='notifications' size={18} color="#fff"></Ionicons>
            </LinearGradient>
            <Text style={settingStyles.settingText}>Notifications</Text>
        </View>
        <Switch
        value={notificationEnabled} 
        onValueChange={() => setNotificationEnabled(!notificationEnabled)}
        thumbColor={"#ffffff"}
        trackColor={{false:colors.border, true: colors.warning}}
        />
      </View>
        {/* Auto sync */}
      <View style={settingStyles.settingItem}>
        <View style={settingStyles.settingLeft}>
            <LinearGradient colors={colors.gradients.success} style={settingStyles.settingIcon}>
                <Ionicons name='sync' size={18} color="#fff"></Ionicons>
            </LinearGradient>
            <Text style={settingStyles.settingText}>Auto Sync</Text>
        </View>
        <Switch
        value={autoSync} 
        onValueChange={() => setAutoSync(!autoSync)}
        thumbColor={"#ffffff"}
        trackColor={{false:colors.border, true: colors.success}}
        />
      </View>

    </LinearGradient>
  )
}

export default Preferences