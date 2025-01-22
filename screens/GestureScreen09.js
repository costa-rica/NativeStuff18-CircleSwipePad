import React, { useState } from "react";
import { View, Modal, Text, StyleSheet } from "react-native";
import {
  GestureDetector,
  Gesture,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

const GestureScreen09 = () => {
  const [modalVisible, setModalVisible] = useState(false);

  // Gesture to detect long press and open modal
  const longPressGesture = Gesture.LongPress()
    .minDuration(500) // Adjust to capture long press duration
    .onEnd(() => {
      setModalVisible(true);
    });

  // Gesture to detect swiping inside modal
  const swipeGesture = Gesture.Pan()
    .onUpdate((event) => {
      console.log(`Swiping: X=${event.translationX}, Y=${event.translationY}`);
    })
    .onEnd(() => {
      console.log("Swipe ended");
    });

  return (
    <GestureHandlerRootView style={styles.container}>
      <GestureDetector gesture={longPressGesture}>
        <View style={styles.gestureArea}>
          <Text>Tap and Hold to Open Modal</Text>
        </View>
      </GestureDetector>

      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <GestureDetector gesture={swipeGesture}>
            <View style={styles.modalContent}>
              <Text>Swipe inside the modal</Text>
              <Text onPress={() => setModalVisible(false)}>Close Modal</Text>
            </View>
          </GestureDetector>
        </View>
      </Modal>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  gestureArea: {
    width: 200,
    height: 200,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: 300,
    height: 300,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default GestureScreen09;
