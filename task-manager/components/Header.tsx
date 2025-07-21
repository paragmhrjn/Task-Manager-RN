import { View, Text } from 'react-native'
import React from 'react'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { createHomeStyles } from '@/assets/styles/home.styles'
import useTheme from '@/hooks/useTheme'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'

const Header = () => {
    const {colors} = useTheme()
    const homestyles = createHomeStyles(colors)
    const tasks = useQuery(api.tasks.getTasks)

    const completedCount = tasks ? tasks.filter((task) => task.isCompleted).length : 0
    const totalCount = tasks ? tasks.length : 0
    const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0
  return (
    <View style={homestyles.header}>
      <View style={homestyles.titleContainer}>
        <LinearGradient colors={colors.gradients.primary} style={homestyles.iconContainer}>
            <Ionicons name='flash-outline' size={28} color="#fff">
                
            </Ionicons>
        </LinearGradient>
        <View style={homestyles.titleTextContainer}>
            <Text style={homestyles.title}>Today&apos;s Task 🖐️</Text>
            <Text style={homestyles.subtitle}>
                {completedCount} of {totalCount} completed
            </Text>
        </View>
      </View>

      
        <View style={homestyles.progressContainer}>
            <View style={homestyles.progressBarContainer}>
                <View style={homestyles.progressBar}>
                    <LinearGradient colors={colors.gradients.success} style={[homestyles.progressFill, {width: `${progressPercentage}%`}]}>

                    </LinearGradient>
                    <Text style={homestyles.progressText}>{Math.round(progressPercentage)}%</Text>
                </View>
            </View>
        </View>
      
    </View>
  )
}

export default Header