import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";

export default function BtnHomeNav(props) {
  return (
    <View style={styles.vwNavGroup}>
      <TouchableOpacity
        style={styles.touchOpNav}
        onPress={() => props.navigation.navigate(props.goTo)}
      >
        <Text style={styles.txtTouchOpNav}>{props.title}</Text>
      </TouchableOpacity>
      <Text>{props.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  vwNavGroup: {
    borderBottomWidth: 1,
    paddingBottom: 1,
    width: Dimensions.get("window").width * 0.8,
  },
  touchOpNav: {
    backgroundColor: "black",
    padding: 5,
    width: 250,
    borderRadius: 12,
    marginBottom: 1,
  },
  txtTouchOpNav: {
    color: "gray",
    alignSelf: "center",
    fontSize: 20,
  },
});
