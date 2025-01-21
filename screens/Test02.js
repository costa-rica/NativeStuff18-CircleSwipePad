import { StyleSheet, View, Dimensions } from "react-native";
import ViewTemplate from "../screens_core/components/ViewTemplate";
import { G, Path, Polygon, Svg } from "react-native-svg";
import { useState } from "react";
import {
  GestureHandlerRootView,
  TapGestureHandler,
  GestureDetector,
  Gesture,
} from "react-native-gesture-handler";

export default function Test02({ navigation }) {
  const [swipeColorDict, setSwipeColorDict] = useState({
    top: "green",
    right: "aqua",
    bottom: "blue",
    left: "lime",
  });
  const defaultColors = {
    top: "green",
    right: "aqua",
    bottom: "blue",
    left: "lime",
  };

  // Function to temporarily change color
  const handleSwipeColorChange = (direction) => {
    console.log(`swiped: ${direction}`);
    setSwipeColorDict((prevState) => ({
      ...prevState,
      [direction]: "gray",
    }));

    setTimeout(() => {
      setSwipeColorDict((prevState) => ({
        ...prevState,
        [direction]: defaultColors[direction],
      }));
    }, 250);
  };

  // Gesture handling: Pan gesture for swipe detection
  const gestureSwipeScripting = Gesture.Pan().onEnd((event) => {
    const { translationX, translationY } = event;

    // const tempScriptArray = scriptArray;
    if (Math.abs(translationX) > Math.abs(translationY)) {
      if (translationX > 0) {
        handleSwipeColorChange("right");
      } else {
        handleSwipeColorChange("left");
      }
    } else {
      if (translationY > 0) {
        // console.log("swipe down");
        handleSwipeColorChange("bottom");
      } else {
        // console.log("swipe up");
        handleSwipeColorChange("top");
      }
    }
  });

  return (
    <ViewTemplate navigation={navigation}>
      <View style={styles.container}>
        <GestureHandlerRootView style={styles.gestRoot}>
          <GestureDetector gesture={gestureSwipeScripting}>
            <View style={styles.vwRectangle}>
              <Svg height="200" width="200" style={styles.vwSvg}>
                <Polygon
                  points="0,0 0,200 100,100 "
                  fill={swipeColorDict["left"]}
                />
              </Svg>
              <Svg height="200" width="100" style={styles.vwSvg02}>
                <Polygon
                  points="0,0 0,200 100,100 "
                  fill={swipeColorDict["right"]}
                />
              </Svg>

              <View
                style={[
                  styles.vwTopRectangle,
                  { backgroundColor: swipeColorDict["top"] },
                ]}
              ></View>
              <View
                style={[
                  styles.vwBottomRectangle,
                  { backgroundColor: swipeColorDict["bottom"] },
                ]}
              ></View>
            </View>
          </GestureDetector>
        </GestureHandlerRootView>
      </View>
    </ViewTemplate>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "gray",
    borderColor: "black",
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  gestRoot: {
    flex: 1,
    justifyContent: "center",
  },
  vwRectangle: { height: 200, width: 200, backgroundColor: "purple" },
  vwSvg: {
    position: "absolute",
    zIndex: 2,
    // top: 50,
  },
  vwSvg02: {
    position: "absolute",
    zIndex: 2,
    right: 0,
    transform: [{ rotate: "180deg" }],
  },
  stylePolygon: {
    backgroundColor: "red",
  },
  vwTopRectangle: {
    height: 100,
    widht: 200,
    // backgroundColor: "green",
  },
  vwBottomRectangle: {
    height: 100,
    widht: 200,
    // backgroundColor: "blue",
  },
});
