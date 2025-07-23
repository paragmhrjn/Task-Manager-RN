
import { Alert, FlatList, StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native";
import useTheme from "@/hooks/useTheme";
import { createHomeStyles } from "@/assets/styles/home.styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient"
import Header from "@/components/Header";
import TaskInput from "@/components/TaskInput";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { Ionicons } from "@expo/vector-icons";
import EmptyState from "@/components/EmpyState";
import { useState } from "react";


type Task = Doc<"tasks">
export default function Index() {
  const { colors } = useTheme()

  const homestyles = createHomeStyles(colors)
  const tasks = useQuery(api.tasks.getTasks)
  // states to change or edit task list
  const [editingId, setEditingId]  = useState<Id<"tasks"> | null>(null);
  const [editText, setEditText ] = useState("");


  const toggleTask = useMutation(api.tasks.toggleTask)
  const deleteTask = useMutation(api.tasks.deleteTask)
  const updateTask = useMutation(api.tasks.updateTask)

  const isLoading = tasks === undefined
  // loading state
  if (isLoading) return <LoadingSpinner />

  const handleToggleTask = async (id: Id<"tasks">) => {
    try {
      await toggleTask({ id })
    } catch (error) {
      console.log("Error toggling task", error)
      Alert.alert("Error", "Failed to toggle Task")

    }
  }

  const handleDeletetask = async (id: Id<"tasks">) => {
    Alert.alert("Delete Task", "Are you sure you want to delete thsi task?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: () => deleteTask({ id }) },
      ]
    )
  }

  const handleEditTask = (task: Task) => {
    setEditText(task.text)
    setEditingId(task._id)
  }
  const handleSaveTask = async () => {
    if (editingId) {

      try {
        await updateTask({ id: editingId, text: editText.trim() })
        setEditingId(null)
        setEditText("")
      } catch (error) {
        console.log("Error updating task", error)
        Alert.alert("Error", "Failed to update task")
      }
    }

  }
  const handleCancelEdit = () => {
    setEditText("")
    setEditingId(null)
  }

  const renderTaskItem = ({ item }: { item: Task }) => {
    const isEditing = editingId === item._id
    return (

      < View
        style={homestyles.taskItemWrapper} >
        <LinearGradient colors={colors.gradients.surface}
          style={homestyles.taskItem}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <TouchableOpacity
            style={homestyles.checkbox}
            activeOpacity={0.7}
            onPress={() => handleToggleTask(item._id)}
          >
            <LinearGradient colors={item.isCompleted ? colors.gradients.success : colors.gradients.muted}
              style={[homestyles.checkboxInner, { borderColor: item.isCompleted ? "transparent" : colors.border }]}>
              {item.isCompleted && <Ionicons name="checkmark" size={18} color="#fff"></Ionicons>}
            </LinearGradient>
          </TouchableOpacity>

          {isEditing ? (
            <View style={homestyles.editContainer}>
              <TextInput
              style={homestyles.editInput}
              value={editText}
              onChangeText={setEditText}
              autoFocus
              multiline
              placeholder="Edit your Task..."
              placeholderTextColor={colors.textMuted}
              >

              </TextInput>

              <View style={homestyles.editButton}>
                <TouchableOpacity onPress={handleSaveTask} activeOpacity={0.8}>
                  <LinearGradient colors={colors.gradients.success} style={homestyles.editButton}>
                    <Ionicons name="checkmark" size={16} color="#fff"></Ionicons>
                    <Text style={homestyles.editButtonText}>Save</Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleCancelEdit} activeOpacity={0.8}>
                  <LinearGradient colors={colors.gradients.muted} style={homestyles.editButton}>
                    <Ionicons name="close" size={16} color="#fff"></Ionicons>
                    <Text style={homestyles.editButtonText}>Cancel</Text>
                  </LinearGradient>
                </TouchableOpacity>


              </View>

            </View>

          ): (
              <View style = {homestyles.taskTextContainer}>
          <Text
            style={[
              homestyles.taskText,
              item.isCompleted && {
                textDecorationLine: "line-through",
                color: colors.textMuted,
                opacity: 0.6
              },
            ]}>
            {item.text}
          </Text>

          <View
            style={homestyles.taskActions}>
            <TouchableOpacity onPress={() => handleEditTask(item)} activeOpacity={0.8}>
              <LinearGradient
                colors={colors.gradients.warning} style={homestyles.actionButton}
              >
                <Ionicons name="pencil" size={14} color="#fff" />
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleDeletetask(item._id)} activeOpacity={0.8}
            >
              <LinearGradient colors={colors.gradients.danger} style={homestyles.actionButton}>
                <Ionicons name="trash" size={14} color="#fff" />
              </LinearGradient>

            </TouchableOpacity>

          </View>
      </View>
    )



  } 

        </LinearGradient >
      </ View >
    )

}
return (
  <LinearGradient colors={colors.gradients.background} style={homestyles.container}>
    <StatusBar barStyle={colors.statusBarStyle} />
    <SafeAreaView
      style={homestyles.safeArea}
    >
      <Header />
      <TaskInput />

      {/* {tasks!.map((task) => <Text key={task._id}>{task.text}</Text>
        )} */}

      {/* to display entered task list */}
      <FlatList data={tasks}
        renderItem={renderTaskItem}
        keyExtractor={(item) => item._id}
        style={homestyles.taskList}
        contentContainerStyle={homestyles.taskListContent}
        ListEmptyComponent={<EmptyState />}
      >

      </FlatList>
    </SafeAreaView>
  </LinearGradient>
);
}
// function to define dynamic styles
// const createStyles = (colors:ColorScheme) => {

//  return StyleSheet.create({
//     container: {

//       flex: 1,
//       justifyContent: "center",
//       alignItems: "center",
//       gap: 10,
//       backgroundColor:colors.bg
//     },
//     content: {

//       fontSize: 22

//     }
//   })

// }