
import { StatusBar, Text, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native";
import useTheme, { ColorScheme } from "@/hooks/useTheme";
import { createHomeStyles } from "@/assets/styles/home.styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient"
import Header from "@/components/Header";
import TaskInput from "@/components/TaskInput";

export default function Index() {
  const { toggleDarkMode, colors } = useTheme()

  const homestyles = createHomeStyles(colors)
  return (
    <LinearGradient colors={colors.gradients.background} style={homestyles.container}>
      <StatusBar barStyle={colors.statusBarStyle}/>
      <SafeAreaView
        style={homestyles.safeArea}
      >
        <Header />
        <TaskInput/>
        {/* section enable to toggle on press */}
        <TouchableOpacity onPress={toggleDarkMode}>
          <Text>
            Toggle the mode
          </Text>
        </TouchableOpacity>
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