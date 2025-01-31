import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens_core/Home";
import WelcomeScreen from "./screens/WelcomeScreen";
import Test01 from "./screens/Test01";
import Test02 from "./screens/Test02";
import Test03 from "./screens/Test03";
import Test04 from "./screens/Test04";
import Test05 from "./screens/Test05";
import GestureScreen06 from "./screens/GestureScreen06";
import Test06 from "./screens/Test06";
import GestureScreen07 from "./screens/GestureScreen07";
import Test07 from "./screens/Test07";
import SvgCircleRadiusIssue from "./screens/SvgCircleRadiusIssue";
import GestureScreen08 from "./screens/GestureScreen08";
import GestureScreen09 from "./screens/GestureScreen09";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="Test01" component={Test01} />
        <Stack.Screen name="Test02" component={Test02} />
        <Stack.Screen name="Test03" component={Test03} />
        <Stack.Screen name="Test04" component={Test04} />
        <Stack.Screen name="Test05" component={Test05} />
        <Stack.Screen name="GestureScreen06" component={GestureScreen06} />
        <Stack.Screen name="Test06" component={Test06} />
        <Stack.Screen name="GestureScreen07" component={GestureScreen07} />
        <Stack.Screen name="Test07" component={Test07} />
        <Stack.Screen
          name="SvgCircleRadiusIssue"
          component={SvgCircleRadiusIssue}
        />
        <Stack.Screen name="GestureScreen08" component={GestureScreen08} />
        <Stack.Screen name="GestureScreen09" component={GestureScreen09} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
