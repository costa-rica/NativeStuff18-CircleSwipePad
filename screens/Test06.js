import { StyleSheet, View } from "react-native";
import ViewTemplate from "../screens_core/components/ViewTemplate";
import { Polygon, Svg, Circle } from "react-native-svg";
import { useState } from "react";
import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
} from "react-native-gesture-handler";

export default function Test06({ navigation }) {
  const circleRadius = 150;
  const outerCircleAdder = 100;
  const outerCircleBottomBoundary = (circleRadius + outerCircleAdder) * 0.85;
  const outerCircleTopBoundary =
    circleRadius + outerCircleAdder - outerCircleBottomBoundary;
  const [swipeColorDict, setSwipeColorDict] = useState({
    outerTop: "rgba(255,255,0,.4)", //rgb(255,255,0)
    outerBottom: "rgba(186,85,211,.4)", //rgb(186,85,211)
    topLeft: "rgba(255,100,100,1)",
    topRight: "rgba(255,165,0,1)",
    right: "rgba(70,130,180,1)", //rgb(70,130,180)
    bottom: "rgba(30,144,255,1)", //rgb(30,144,255)
    left: "rgba(50,205,50,1)", //rgb(50,205,50)
  });

  const defaultColors = {
    outerTop: "rgba(255,255,0,.4)", //rgb(255,255,0)
    outerBottom: "rgba(186,85,211,.4)", //rgb(186,85,211)
    topLeft: "rgba(255,100,100,1)",
    topRight: "rgba(255,165,0,1)",
    right: "rgba(70,130,180,1)", //rgb(70,130,180)
    bottom: "rgba(30,144,255,1)", //rgb(30,144,255)
    left: "rgba(50,205,50,1)", //rgb(50,205,50)
  };

  // outer layer

  // Function to temporarily change color
  const handleSwipeColorChange = (direction) => {
    if (direction.includes("outer")) {
      setSwipeColorDict((prevState) => ({
        ...prevState,
        [direction]: "white",
      }));
    } else {
      setSwipeColorDict((prevState) => ({
        ...prevState,
        [direction]: "gray",
      }));
    }

    setTimeout(() => {
      setSwipeColorDict((prevState) => ({
        ...prevState,
        [direction]: defaultColors[direction],
      }));
    }, 250);
  };

  const gestureSwipeScripting = Gesture.Pan().onEnd((event) => {
    // const { translationX, translationY } = event;
    const { translationX, translationY, x, y, absoluteX, absoluteY } = event;
    console.log(`translationX: ${translationX}`);
    // console.log(event);
    console.log(
      `outerCircleBottomBoundary: ${outerCircleBottomBoundary} vs y: ${y}`
    );
    console.log(`outerCircleTopBoundary: ${outerCircleTopBoundary} vs y: ${y}`);

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
        if (y > outerCircleBottomBoundary) {
          handleSwipeColorChange("outerBottom");
        }
      } else {
        console.log("swipe up");
        if (translationX < 0) {
          handleSwipeColorChange("topLeft");
          if (y < outerCircleTopBoundary) {
            handleSwipeColorChange("outerTop");
          }
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
                styles.vwCircleOuter,
                {
                  width: circleRadius + outerCircleAdder,
                  height: circleRadius + outerCircleAdder,
                  borderRadius: circleRadius + outerCircleAdder / 2,
                },
              ]}
            >
              <Svg
                height={`${circleRadius + outerCircleAdder}`}
                width={`${circleRadius + outerCircleAdder}`}
                style={[
                  styles.vwSvgOuter,
                  { transform: [{ rotate: "-90degs" }] },
                ]}
              >
                <Polygon
                  points={`0,0 0,${circleRadius + outerCircleAdder} ${
                    circleRadius / 2 + outerCircleAdder / 2
                  },${circleRadius / 2 + outerCircleAdder / 2}`}
                  fill={swipeColorDict["outerBottom"]}
                />
              </Svg>
              <Svg
                height={`${circleRadius + outerCircleAdder}`}
                width={`${circleRadius + outerCircleAdder}`}
                style={[
                  styles.vwSvgOuter,
                  { transform: [{ rotate: "90degs" }] },
                ]}
              >
                <Polygon
                  points={`0,0 0,${circleRadius + outerCircleAdder} ${
                    circleRadius / 2 + outerCircleAdder / 2
                  },${circleRadius / 2 + outerCircleAdder / 2}`}
                  fill={swipeColorDict["outerTop"]}
                />
              </Svg>

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

  vwSvgOuter: {
    position: "absolute",
    zIndex: 1,
    left: 0,
  },
  vwCircleOuter: {
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden", // Ensure content inside respects circular boundary
  },
  vwCircleOuterTop: {
    position: "absolute",
    top: 0,
    left: 0,
  },

  // --- Inner Circle ----

  vwCircle: {
    // backgroundColor: "purple",
    overflow: "hidden", // Ensure content inside respects circular boundary
    justifyContent: "center",
    alignItems: "center",
    zIndex: 3,
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
    // backgroundColor: "green",
  },
  vwTopRight: {
    flex: 1, // Take the other half
    // backgroundColor: "orange",
  },
  vwBottomRectangle: {
    position: "absolute",
    bottom: 0,
    height: "50%",
    width: "100%",
  },
});
