import { StyleSheet, View } from "react-native";
import ViewTemplate from "../screens_core/components/ViewTemplate";
import { Polygon, Svg, Circle } from "react-native-svg";
import { useState } from "react";
import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
} from "react-native-gesture-handler";

export default function Test05({ navigation }) {
  const circleRadius = 300;
  const [swipeColorDict, setSwipeColorDict] = useState({
    topLeft: "green",
    topRight: "orange",
    right: "aqua",
    bottom: "blue",
    left: "lime",
  });

  const defaultColors = {
    topLeft: "green",
    topRight: "orange",
    right: "aqua",
    bottom: "blue",
    left: "lime",
  };

  // Function to temporarily change color
  const handleSwipeColorChange = (direction) => {
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

  const gestureSwipeScripting = Gesture.Pan().onEnd((event) => {
    // const { translationX, translationY } = event;
    const { translationX, translationY, absoluteX, absoluteY } = event;
    console.log(`translationX: ${translationX}`);

    // Calculate swipe distance using the Pythagorean theorem
    const swipeDistance = Math.sqrt(translationX ** 2 + translationY ** 2);

    // Ignore swipes inside the smaller circle
    if (swipeDistance < circleRadius / 4) {
      console.log("Swipe within inner circle, ignoring...");
      return;
    }

    if (Math.abs(translationX) > Math.abs(translationY)) {
      if (translationX > 0) {
        console.log("swipe right");
        handleSwipeColorChange("right");
      } else {
        console.log("swipe left");
        handleSwipeColorChange("left");
      }
    } else {
      if (translationY > 0) {
        console.log("swipe down");
        handleSwipeColorChange("bottom");
      } else {
        console.log("swipe up");
        if (translationX < 0) {
          handleSwipeColorChange("topLeft");
        } else {
          handleSwipeColorChange("topRight");
        }
      }
    }
  });

  return (
    <ViewTemplate navigation={navigation}>
      <View style={styles.container}>
        <GestureHandlerRootView style={styles.gestRoot}>
          <GestureDetector gesture={gestureSwipeScripting}>
            <View
              style={[
                styles.vwCircle,
                {
                  width: circleRadius,
                  height: circleRadius,
                  borderRadius: circleRadius / 2,
                },
              ]}
            >
              <Svg
                height={circleRadius}
                width={circleRadius}
                style={{ zIndex: 3, position: "absolute" }}
              >
                <Circle
                  cx={circleRadius / 2} // Centering horizontally (x coords w/ respect to parent <Svg/>)
                  cy={circleRadius / 2} // Centering vertically (y coords w/ respect to parent <Svg/>)
                  r={circleRadius / 4} // Radius is 1/4 of the outer circle
                  stroke="purple"
                  strokeWidth="2.5"
                  fill="white"
                />
              </Svg>
              <Svg
                height={`${circleRadius}`}
                width={`${circleRadius}`}
                style={styles.vwSvg}
              >
                <Polygon
                  points={`0,0 0,${circleRadius} ${circleRadius / 2},${
                    circleRadius / 2
                  }`}
                  fill={swipeColorDict["left"]}
                />
              </Svg>
              <Svg
                height={`${circleRadius}`}
                width={`${circleRadius}`}
                style={styles.vwSvg02}
              >
                <Polygon
                  points={`0,0 0,${circleRadius} ${circleRadius / 2},${
                    circleRadius / 2
                  }`}
                  fill={swipeColorDict["right"]}
                />
              </Svg>
              {/* <View
                style={[
                  styles.vwTopRectangle,
                  { backgroundColor: swipeColorDict["top"] },
                ]}
              /> */}
              {/* Top Rectangle containing left and right halves */}
              <View style={styles.vwTopRectangle}>
                <View
                  style={[
                    styles.vwTopLeft,
                    { backgroundColor: swipeColorDict["topLeft"] },
                  ]}
                />
                <View
                  style={[
                    styles.vwTopRight,
                    { backgroundColor: swipeColorDict["topRight"] },
                  ]}
                />
              </View>
              <View
                style={[
                  styles.vwBottomRectangle,
                  { backgroundColor: swipeColorDict["bottom"] },
                ]}
              />
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
  vwCircle: {
    backgroundColor: "purple",
    overflow: "hidden", // Ensure content inside respects circular boundary
    justifyContent: "center",
    alignItems: "center",
  },
  vwSvg: {
    position: "absolute",
    zIndex: 2,
    left: 0,
  },
  vwSvg02: {
    position: "absolute",
    zIndex: 2,
    right: 0,
    transform: [{ rotate: "180deg" }],
  },
  vwTopRectangle: {
    position: "absolute",
    top: 0,
    flexDirection: "row",
    width: "100%",
    height: "50%", // Half of the circle
  },
  vwTopLeft: {
    flex: 1, // Take half of the space
    backgroundColor: "green",
  },
  vwTopRight: {
    flex: 1, // Take the other half
    backgroundColor: "orange",
  },
  vwBottomRectangle: {
    position: "absolute",
    bottom: 0,
    height: "50%",
    width: "100%",
  },
});
