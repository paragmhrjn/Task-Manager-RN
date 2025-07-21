import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import useTheme from '@/hooks/useTheme'
import { createHomeStyles } from '@/assets/styles/home.styles'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'

const TaskInput = () => {
    const {colors} = useTheme()
    const homestyles = createHomeStyles(colors)

    const [newTask, setNewTask] = useState("")
    const addTask = useMutation(api.tasks.addTask)

    const handleAddTask = async () => {
        if (newTask.trim()){
            try {
                await addTask({text:newTask.trim()})
                setNewTask("")
            } catch (error) {
                console.log("error adding a task", error)
                Alert.alert("Error", "Failed to add Task")
            }
        }
    }
  return (
    <View
    style={homestyles.inputSection}>
    <View style={homestyles.inputWrapper}>
        <TextInput
        style={homestyles.input}
        placeholder='What needs to be done?'
        value={newTask}
        onChangeText={setNewTask}
        onSubmitEditing={handleAddTask}
        placeholderTextColor={colors.textMuted}
        />
        <TouchableOpacity onPress={handleAddTask} activeOpacity={0.8} disabled={!newTask.trim()}>
            <LinearGradient
            colors={newTask.trim() ? colors.gradients.primary : colors.gradients.muted}
            style={[homestyles.addButton, !newTask.trim() && homestyles.addButtonDisabled]}
            >
                <Ionicons name='add' size={24} color="#fff"/>
            </LinearGradient>
        </TouchableOpacity>
    </View>

    </View>
  )
}

export default TaskInput