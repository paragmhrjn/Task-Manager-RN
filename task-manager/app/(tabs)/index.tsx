
import { Alert, FlatList, StatusBar,Text, TouchableOpacity, View } from "react-native";
import useTheme, { ColorScheme } from "@/hooks/useTheme";
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


type Task = Doc<"tasks">
export default function Index() {
  const { toggleDarkMode, colors } = useTheme()

  const homestyles = createHomeStyles(colors)
  const tasks = useQuery(api.tasks.getTasks)

  const toggleTask = useMutation(api.tasks.toggleTask)

  const isLoading = tasks === undefined
  // loading state
  if (isLoading) return <LoadingSpinner />

  const handleToggleTask = async (id:Id<"tasks">) => {
    try {
        await toggleTask({id})
    } catch (error) {
      console.log("Error toggling task", error)
      Alert.alert("Error", "Failed to toggle Task")
      
    }
  }

  const renderTaskItem = ({ item }: { item: Task }) => {

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

          <View style={homestyles.taskTextContainer}>
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
              <TouchableOpacity onPress={() => {}} activeOpacity={0.8}>
                <LinearGradient
                colors={colors.gradients.warning} style={homestyles.actionButton}
                >
                  <Ionicons name="pencil" size={14} color="#fff"/>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity
              onPress={()=> {}} activeOpacity={0.8}
              >
                <LinearGradient colors={colors.gradients.danger} style={homestyles.actionButton}>
                  <Ionicons name="trash" size={14} color="#fff"/>
                </LinearGradient>

              </TouchableOpacity>
      
            </View>
          </View>
        </LinearGradient>
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
          ListEmptyComponent={<EmptyState/>}
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