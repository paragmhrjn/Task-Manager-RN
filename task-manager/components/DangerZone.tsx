import { View, Text, Alert, TouchableOpacity } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { createSettingsStyles } from '@/assets/styles/setting.styles'
import useTheme from '@/hooks/useTheme'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Ionicons } from '@expo/vector-icons'


const DangerZone = () => {
    const { colors } = useTheme()
    const settingStyles = createSettingsStyles(colors)
    const clearAllTasks = useMutation(api.tasks.clearAllTasks)

    const handleResetApp = async () => {
        Alert.alert(
            "Reset App",
            "⚠️ This will delete all your tasks permanently. Action cannot be undone.",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete All",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            const result = await clearAllTasks();
                            Alert.alert(
                                "App Reset",
                                `Successfully deleted ${result.deletedCount} task${result.deletedCount === 1 ? "" : "s"}. Your app has been reset.`
                            )
                        } catch (error) {
                            console.log("Error deleting all tasks", error)
                            Alert.alert("Error", "Failed to reset app")
                        }
                    }
                }
            ]
        )
    }
    return (
        <LinearGradient colors={colors.gradients.surface} style={settingStyles.section}>
            <Text style={settingStyles.sectionTitle}>DangerZone</Text>
            <TouchableOpacity style={[settingStyles.actionButton, { borderBottomWidth: 0 }]}
                onPress={handleResetApp}
            >
                <View style={settingStyles.actionLeft}>
                    <LinearGradient colors={colors.gradients.danger} style={settingStyles.actionIcon}>
                        <Ionicons name='trash' size={18} color="#fff"></Ionicons>
                    </LinearGradient>
                    <Text style={settingStyles.actionTextDanger}>Reset App</Text>
                </View>
                <Ionicons name='chevron-forward' size={18} color={colors.textMuted}></Ionicons>
            </TouchableOpacity>
        </LinearGradient>
    )
}

export default DangerZone