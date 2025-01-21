import { StyleSheet, Text, View } from "react-native";
import ViewTemplate from "../screens_core/components/ViewTemplate";

export default function WelcomeScreen({ navigation }) {
  return (
    <ViewTemplate navigation={navigation}>
      <View style={styles.container}>
        <Text>How this works:</Text>
        <Text>1. Add screens in the screens/ directory</Text>
        <Text>2. Add the screen to App.js</Text>
        <Text>
          3. Add screen to Home.js in a {`<BtnHomNav/>`} see the WelcomeScreen
          example{" "}
        </Text>
      </View>
    </ViewTemplate>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "gray",
    justifyContent: "center",
    padding: 10,
  },
});
