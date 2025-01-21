import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import BtnHomNav from "./components/BtnHomeNav";

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.vwTitle}>
        <Text style={styles.txtTitle}>Home Screen</Text>
      </View>
      <ScrollView>
        <View style={styles.vwButtons}>
          <BtnHomNav
            goTo={"WelcomeScreen"}
            title={"Welcome Screen"}
            description={"How this works"}
            navigation={navigation}
          />
          <BtnHomNav
            goTo={"Test01"}
            title={"Test01"}
            description={"Test rounded trianlge"}
            navigation={navigation}
          />
          <BtnHomNav
            goTo={"Test02"}
            title={"Test02"}
            description={
              "Create rectangles and triangles on the sides that change color on swipe"
            }
            navigation={navigation}
          />
          <BtnHomNav
            goTo={"Test03"}
            title={"Test03"}
            description={"Test02 but in a circle"}
            navigation={navigation}
          />
          <BtnHomNav
            goTo={"Test04"}
            title={"Test04"}
            description={"Test03 dynamic circle radius"}
            navigation={navigation}
          />
          <BtnHomNav
            goTo={"Test05"}
            title={"Test05"}
            description={"Test04 spliting up the top left and right"}
            navigation={navigation}
          />
          <BtnHomNav
            goTo={"GestureScreen06"}
            title={"GestureScreen06"}
            description={
              "Initial pad where user can top and display circle touch pad on user's tap location. This picks up from Test05.js. CircleTouchPad also uses Test05.js"
            }
            navigation={navigation}
          />
          <BtnHomNav
            goTo={"Test06"}
            title={"Test06"}
            description={"Second layer of swiping"}
            navigation={navigation}
          />
          <BtnHomNav
            goTo={"GestureScreen07"}
            title={"GestureScreen07"}
            description={"Second layer of swiping on touch pad"}
            navigation={navigation}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,.2)",
    alignItems: "center",
  },
  vwTitle: {
    paddingTop: 50,
    paddingBottom: 100,
  },
  txtTitle: { fontSize: 30 },
  vwButtons: {
    gap: 5,
  },
});
