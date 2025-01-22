import React, { useState } from "react";
import { View, Modal, Text, StyleSheet, Dimensions } from "react-native";
import {
  GestureHandlerRootView,
  TapGestureHandler,
  GestureDetector,
  Gesture,
} from "react-native-gesture-handler";
import ViewTemplate from "../screens_core/components/ViewTemplate";
import CircleSwipePad03 from "./components/CircleSwipePad03";

const modalRadius = 100;
export default function GestureScreen08({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const [actionList, setActionList] = useState([]);
  const [tapDetails, setTapDetails] = useState(null);
  // const [actionsArray, setActionsArray] = useState([]);

  // const handleTap = (event) => {
  //   console.log(`tap event`);
  //   console.log(event);
  //   const { x, y, absoluteX, absoluteY } = event.nativeEvent;
  //   const timestamp = new Date().toISOString();
  //   // Set the modal position based on screen coordinates
  //   setModalPosition({ x: absoluteX, y: absoluteY });
  //   setModalVisible(true);
  //   setTapDetails({ timestamp, absoluteX, absoluteY });
  // };
  const gestureTapBegin = Gesture.Tap().onBegin((event) => {
    console.log(event);
    const timestamp = new Date().toISOString();
    const { x, y, absoluteX, absoluteY } = event;
    setModalPosition({ x: absoluteX, y: absoluteY });
    setModalVisible(true);
    setTapDetails({ timestamp, absoluteX, absoluteY });
  });

  // onEnd((event) => {
  //   if (!timelineLayout) return;
  //   const newProgress = Math.min(
  //     Math.max(event.x / timelineLayout.width, 0),
  //     1
  //   );
  //   handleTimelineNewPosition(newProgress);
  // });

  return (
    <ViewTemplate navigation={navigation}>
      <GestureHandlerRootView style={styles.container}>
        {/* <TapGestureHandler onActivated={handleTap}> */}
        <GestureDetector gesture={gestureTapBegin}>
          <View style={styles.tapArea}>
            <View style={styles.vwRegisterTaps}>
              {tapDetails && (
                <View>
                  <Text>Time: {tapDetails.timestamp}</Text>
                  <Text>
                    Coordinates: X:{tapDetails.absoluteX}, Y:
                    {tapDetails.absoluteY}
                  </Text>
                </View>
              )}
              {actionList.length > 0 &&
                actionList.map((elem, index) => {
                  return (
                    <View key={index}>
                      <Text style={styles.txtAction}>Action: {elem}</Text>
                    </View>
                  );
                })}
            </View>
            <Text style={styles.tapText}>Tap anywhere inside this view</Text>
          </View>
        </GestureDetector>
        {/* </TapGestureHandler> */}

        {modalVisible && (
          <Modal
            transparent={true}
            animationType="none"
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalOverlay}>
              <View
                style={[
                  styles.modalContent,
                  {
                    position: "absolute",
                    left: modalPosition.x - modalRadius, // Center modal horizontally
                    top: modalPosition.y - modalRadius, // Center modal vertically
                  },
                ]}
              >
                <CircleSwipePad03
                  circleRadius={modalRadius}
                  setModalVisible={setModalVisible}
                  setActionList={setActionList}
                  actionList={actionList}
                />
              </View>
            </View>
          </Modal>
        )}
      </GestureHandlerRootView>
    </ViewTemplate>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  tapArea: {
    width: "80%",
    height: "80%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ddd",
    borderRadius: 10,
  },
  tapText: {
    fontSize: 16,
    color: "#333",
  },
  vwRegisterTaps: {
    position: "absolute",
    top: 0,
    right: 0,
    // width: 100,
    // height: 100,
    // backgroundColor: "tan",
    padding: 3,
    borderRadius: 5,
  },
  // ---- MOdal ---
  modalOverlay: {
    flex: 1,
    // backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    alignItems: "center",
    position: "absolute",
    // backgroundColor: "purple",
  },
  txtAction: {
    backgroundColor: "gray",
    alignSelf: "center",
    margin: 1,
  },
});
