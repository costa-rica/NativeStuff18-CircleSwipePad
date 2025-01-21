import { StyleSheet, View, Dimensions } from "react-native";
import RoundedTriangle from "./components/RoundedTriangle01";

export default function Test01({ navigation }) {
  const wind_width = Dimensions.get("window").width;
  const wind_height = Dimensions.get("window").height;

  const numTriangles = 6; // Number of triangles
  const radius = 100; // Radius of the circle
  const centerX = wind_width / 2;
  const centerY = wind_height / 2;
  const triangleSize = 100; // Size of the triangle, should match component size

  const getTriangleStyle = (index) => {
    const angle = (index / numTriangles) * (2 * Math.PI);
    const rotationAngle = (index * (360 / numTriangles)) - 90; // Add 90 to point tips inward

    return {
      position: "absolute",
      left: centerX + (radius -40)  * Math.cos(angle) - triangleSize / 2,
      top: centerY + (radius -40)  * Math.sin(angle) - triangleSize / 2,
      transform: [{ rotate: `${rotationAngle}deg` }],
    };
  };

  return (
    <View style={styles.container}>
      {Array.from({ length: numTriangles }).map((_, index) => (
        <RoundedTriangle
          key={index}
          colour={index % 2 === 0 ? "green" : "orange"}
          style={getTriangleStyle(index)}
          size={triangleSize}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "gray",
    borderColor: "black",
    borderWidth: 3,
  },
});

// ///----------------- Triangles circlular - not facign each other --------

// import { StyleSheet, View, Dimensions } from "react-native";
// import RoundedTriangle from "./components/RoundedTriangle01";

// export default function Test01({ navigation }) {
//   const wind_width = Dimensions.get("window").width;
//   const wind_height = Dimensions.get("window").height;

//   const numTriangles = 6; // Number of triangles in the circle
//   const radius = 100; // Radius of the circle
//   const centerX = wind_width / 2;
//   const centerY = wind_height / 2;
//   const triangleSize = 100; // Ensure this matches the SVG size

//   const getTriangleStyle = (index) => {
//     const angle = (index / numTriangles) * (2 * Math.PI);
//     return {
//       position: "absolute",
//       left: centerX + radius * Math.cos(angle) - triangleSize / 2,
//       top: centerY + radius * Math.sin(angle) - triangleSize / 2,
//     };
//   };

//   return (
//     <View style={styles.container}>
//       {Array.from({ length: numTriangles }).map((_, index) => (
//         <RoundedTriangle
//           key={index}
//           colour={index % 2 === 0 ? "green" : "orange"}
//           style={getTriangleStyle(index)}
//           size={triangleSize}
//         />
//       ))}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "gray",
//     borderColor: "black",
//     borderWidth: 3,
//   },
// });



///// ------------ OLD ------------



// import { StyleSheet, View, Dimensions } from "react-native";
// import ViewTemplate from "../screens_core/components/ViewTemplate";
// import RoundedTriangle from "./components/RoundedTriangle01";

// export default function Test01({ navigation }) {


//   const numTriangles = 6;
//   const radius = 100;
//   const centerX = wind_width / 2;
//   const centerY = wind_height / 2;

//   const wind_width = Dimensions.get("window").width
//   const wind_height = Dimensions.get("window").height

//   // Dynamic Styles
//  const  triStyleGreen = {position:"absolute", top:wind_height /2, left: 0 }
//  const  triStyleOrange = {position:"absolute",top:wind_height /2, left: 0}
 

//  const getTriangleStyle = (index) => {
//   const angle = (index / numTriangles) * (2 * Math.PI);
//   return {
//     position: "absolute",
//     left: centerX + radius * Math.cos(angle) - 50, // Adjust -50 to center the triangles
//     top: centerY + radius * Math.sin(angle) - 50,
//   };
// };


//   return (
//       <View style={styles.container}>


//       {Array.from({ length: numTriangles }).map((_, index) => (
//       <RoundedTriangle key={index} colour={index % 2 === 0 ? "green" : "orange"} style={getTriangleStyle(index)} />
//     ))}

//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "gray",
//     borderColor:"black",
//     borderWidth:3
//   },
// });
