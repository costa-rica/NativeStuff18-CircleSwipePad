# React Native Stuff - Circle Swipe Pad

## Description

### GestureScreen06.

Uses Gesture detector to display cicle swipe pad on tap of screen. then the circle tap senses swiping. Swipe kept inside the inner circle hides the circle swipe pad

### GestureScreen07 / CircleTouchPad02

CircleTouchPad02 uses two layers of circles to capture actions

- the problem is the center circle and outer circles are not very precise.
  - regions are approximated and in some cases very rough
  - center circle is actually just length of swipe
  - top outer circle is just if y < ~8
  - bottom outer is just if y > ~260

## Environment Variables

- store in: .env.local

```env
EXPO_PUBLIC_API_URL=http://192.168.1.193:3000
```

## Installations

### 1. Navigation

```
yarn add @react-navigation/native @react-navigation/native-stack
npx expo install react-native-screens react-native-safe-area-context
```

### 2. Gesture handling

`npx expo install react-native-gesture-handler`

### 3. react-native-svg

`yarn add react-native-svg`
