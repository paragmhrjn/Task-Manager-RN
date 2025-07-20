import { Link } from "expo-router";
import { Text, View } from "react-native";
import { StyleSheet } from "react-native";
export default function Index() {
  return (
    <View
      style={styles.container}
    >
      <Text style={styles.content}>Edit app/index.tsx to edit this screen.</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    gap: 10
  },
  content: {
    
  fontSize:22
  
  }
})