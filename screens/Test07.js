import { StyleSheet, View } from "react-native";
import ViewTemplate from "../screens_core/components/ViewTemplate";
import { Polygon, Svg, Circle } from "react-native-svg";
import { useState } from "react";
import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
} from "react-native-gesture-handler";

export default function Test07({ navigation }) {
  const circleRadius = 100;
  const [circleCenter, setCircleCenter] = useState({ x: 0, y: 0 });

  const gestureSwipeScripting = Gesture.Pan().onEnd((event) => {
    const { translationX, translationY, x, y, absoluteX, absoluteY } = event;
    console.log("-- new swipe ---");
    // console.log(event);
    // console.log(`x:${x}, y: ${y}`);

    // Get the center of the outer circle relative to the screen
    const circleCenterX = circleRadius / 2;
    const circleCenterY = circleRadius / 2;

    // Calculate the distance from the center of the circle to the swipe end position
    // const distance = Math.sqrt(
    //   Math.pow(absoluteX - circleCenterX, 2) +
    //     Math.pow(absoluteY - circleCenterY, 2)
    // );
    const distance = Math.sqrt(
      Math.pow(x - circleCenter.x, 2) + Math.pow(y - circleCenter.y, 2)
    );
    console.log(`x,y: (${x}, ${y})`);
    console.log(`center.x , y: ${circleCenter.x}, ${circleCenter.y}`);
    console.log(`distance: ${distance}`);

    // Define inner circle radius
    const innerCircleRadius = circleRadius / 2;

    if (distance <= innerCircleRadius) {
      console.log("Swipe ended inside the inner circle.");
    } else {
      console.log("Swipe ended OUTSIDE the inner circle.");
    }
  });

  // Dynamic Styles
  const styleVwCircle = {
    overflow: "hidden", // Ensure content inside respects circular boundary
    width: circleRadius * 2,
    height: circleRadius * 2,
    borderRadius: circleRadius,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 3,
    backgroundColor: "green",
  };

  return (
    <ViewTemplate navigation={navigation}>
      <View style={styles.container}>
        <GestureHandlerRootView style={{ backgroundColor: "transparent" }}>
          {/* <GestureHandlerRootView> */}
          <GestureDetector gesture={gestureSwipeScripting}>
            {/* <View
              style={styleVwCircle}
              onLayout={(event) => {
                console.log(event.nativeEvent.layout);
              }}
            > */}
            <View
              style={styleVwCircle}
              onLayout={(event) => {
                const { x, y, width, height } = event.nativeEvent.layout;
                setCircleCenter({
                  x: x + width / 2, // Center X relative to screen
                  y: y + height / 2, // Center Y relative to screen
                });
                console.log(
                  `circle center x: ${x + width / 2}, y: ${y + height / 2}`
                );
              }}
            >
              <Svg
                height={circleRadius}
                width={circleRadius}
                style={{ zIndex: 3, position: "absolute" }}
              >
                <Circle
                  cx={circleRadius / 2} // Centering horizontally (x coords w/ respect to parent <Svg/>)
                  cy={circleRadius / 2} // Centering vertically (y coords w/ respect to parent <Svg/>)
                  r={circleRadius / 2} // Radius is 1/4 of the outer circle
                  stroke="purple"
                  strokeWidth="2.5"
                  fill="white"
                  onLayout={(event) => {
                    console.log(`circle event:`);
                    console.log(event.nativeEvent.layout);
                  }}
                />
              </Svg>
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
});
