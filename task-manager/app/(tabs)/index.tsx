
import { Text, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native";
import useTheme from "@/hooks/useTheme";



export default function Index() {
  const { toggleDarkMode } = useTheme()

  return (
    <View
      style={styles.container}
    >
      <Text style={styles.content}>Edit app/index.tsx to edit this screen.</Text>
      {/* section enable to toggle on press */}
      <TouchableOpacity onPress={toggleDarkMode}>
        <Text>
          Toggle the mode
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {

    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10
  },
  content: {

    fontSize: 22

  }
})