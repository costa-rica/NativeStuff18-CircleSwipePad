import { StyleSheet, View } from "react-native";
// import ViewTemplate from "../screens_core/components/ViewTemplate";
import { Polygon, Svg, Circle } from "react-native-svg";
import { useState } from "react";
import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
} from "react-native-gesture-handler";

export default function CircleSwipePad03(props) {
  //   const circleRadius = 150;
  const innerCircleRadius = props.circleRadius / 2;
  const outerCircleAdder = 100;

  const gestureSwipeScripting = Gesture.Pan().onEnd((event) => {
    const { translationX, translationY, x, y, absoluteX, absoluteY } = event;
    // console.log("-- new swipe ---");

    const distance = Math.sqrt(
      Math.pow(x - props.circleRadius, 2) + Math.pow(y - props.circleRadius, 2)
    );
    // console.log(`distance: ${distance}`);

    if (distance <= innerCircleRadius) {
      console.log("Swipe ended inside the inner circle.");
      props.setModalVisible(false);
    } else {
      console.log("Swipe ended OUTSIDE the inner circle.");
    }
  });

  // Dynamic Styles
  const styleVwMain = {
    // backgroundColor: "green",
  };
  const styleCircleInner = {
    position: "absolute",
    top: props.circleRadius - innerCircleRadius,
    left: props.circleRadius - innerCircleRadius,
    // backgroundColor: "red",
    height: 50,
    width: 50,
  };

  return (
    <GestureHandlerRootView style={{ backgroundColor: "transparent" }}>
      {/* <GestureHandlerRootView> */}
      <GestureDetector gesture={gestureSwipeScripting}>
        <View style={styleVwMain}>
          <Svg height={props.circleRadius * 2} width={props.circleRadius * 2}>
            <Circle
              cx={props.circleRadius} // Centering horizontally (x coords w/ respect to parent <Svg/>)
              cy={props.circleRadius} // Centering vertically (y coords w/ respect to parent <Svg/>)
              r={props.circleRadius}
              stroke="black"
              strokeWidth="2.5"
              fill="white"
              onLayout={(event) => {
                console.log(`circle event:`);
                console.log(event.nativeEvent.layout);
              }}
            />
          </Svg>

          <Svg
            height={innerCircleRadius * 2}
            width={innerCircleRadius * 2}
            style={styleCircleInner}
          >
            <Circle
              cx={innerCircleRadius} // Centering horizontally (x coords w/ respect to parent <Svg/>)
              cy={innerCircleRadius} // Centering vertically (y coords w/ respect to parent <Svg/>)
              r={innerCircleRadius}
              stroke="purple"
              strokeWidth="2.5"
              fill="rgba(255,255,0,.4)"
              onLayout={(event) => {
                console.log(`circle event (inner):`);
                console.log(event.nativeEvent.layout);
              }}
            />
          </Svg>
        </View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  gestRoot: {
    flex: 1,
    justifyContent: "center",
  },
});
