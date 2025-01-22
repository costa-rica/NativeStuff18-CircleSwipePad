import { StyleSheet, View } from "react-native";
import { Svg, Circle } from "react-native-svg";

export default function SvgCircleRadiusIssue() {
  const circleRadius = 100;

  return (
    <View style={styles.container}>
      <Svg
        height={circleRadius * 2}
        width={circleRadius * 2}
        style={{ zIndex: 3, position: "absolute" }}
      >
        <Circle
          cx={circleRadius} // Centering horizontally (x coords w/ respect to parent <Svg/>)
          cy={circleRadius} // Centering vertically (y coords w/ respect to parent <Svg/>)
          r={circleRadius} // Radius is 1/4 of the outer circle
          fill="white"
          onLayout={(event) => {
            console.log(`circle event:`);
            console.log(event.nativeEvent.layout);
          }}
        />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "gray",
  },
});
