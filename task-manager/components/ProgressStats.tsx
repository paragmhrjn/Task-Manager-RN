import { View, Text } from 'react-native'
import React from 'react'
import useTheme from '@/hooks/useTheme'
import { createSettingsStyles } from '@/assets/styles/setting.styles'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'

const ProgressStats = () => {
    const { colors } = useTheme()
    const settingStyles = createSettingsStyles(colors)

    const tasks = useQuery(api.tasks.getTasks)
    const totalTasks = tasks ? tasks.length : 0
    const completedTasks = tasks ? tasks.filter((task) => task.isCompleted).length : 0
    const activeTasks = totalTasks - completedTasks

    return (
        <LinearGradient colors={colors.gradients.surface} style={settingStyles.section}>
            <Text style={settingStyles.sectionTitle}>Progress Stats</Text>
            <View style={settingStyles.statsContainer}>

                {/* total tasks */}
                <LinearGradient colors={colors.gradients.background}
                    style={[settingStyles.statCard, { borderLeftColor: colors.primary }]}>
                    <View style={settingStyles.statIconContainer}>
                        <LinearGradient colors={colors.gradients.primary}
                            style={settingStyles.statIcon}
                        >
                            <Ionicons name='list' size={20} color="#fff" />
                        </LinearGradient>
                    </View>

                    <View>
                        <Text style={settingStyles.statNumber}>{totalTasks}</Text>
                        <Text style={settingStyles.statLabel}>Total Tasks</Text>
                    </View>
                </LinearGradient>

                {/* completed tasks */}
                <LinearGradient colors={colors.gradients.background}
                    style={[settingStyles.statCard, { borderLeftColor: colors.success}]}>
                    <View style={settingStyles.statIconContainer}>
                        <LinearGradient colors={colors.gradients.success}
                            style={settingStyles.statIcon}
                        >
                            <Ionicons name='checkmark-circle' size={20} color="#fff" />
                        </LinearGradient>
                    </View>

                    <View>
                        <Text style={settingStyles.statNumber}>{completedTasks}</Text>
                        <Text style={settingStyles.statLabel}>Completed</Text>
                    </View>
                </LinearGradient>

                {/* Active tasks */}
                <LinearGradient colors={colors.gradients.background}
                    style={[settingStyles.statCard, { borderLeftColor: colors.warning}]}>
                    <View style={settingStyles.statIconContainer}>
                        <LinearGradient colors={colors.gradients.warning}
                            style={settingStyles.statIcon}
                        >
                            <Ionicons name='time' size={20} color="#fff" />
                        </LinearGradient>
                    </View>

                    <View>
                        <Text style={settingStyles.statNumber}>{activeTasks}</Text>
                        <Text style={settingStyles.statLabel}>Active</Text>
                    </View>
                </LinearGradient>
            </View>

        </LinearGradient>
    )
}

export default ProgressStats