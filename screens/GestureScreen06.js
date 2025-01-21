import React, { useState } from "react";
import { View, Modal, Text, StyleSheet, Dimensions } from "react-native";
import {
  GestureHandlerRootView,
  TapGestureHandler,
} from "react-native-gesture-handler";
import ViewTemplate from "../screens_core/components/ViewTemplate";
import CircleTouchPad from "./components/CircleTouchPad";

const modalRadius = 150;
export default function GestureScreen06({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const [actionList, setActionList] = useState([]);
  const [tapDetails, setTapDetails] = useState(null);

  const handleActionWheel01Button = (buttonName) => {
    console.log("clicked button --> ", buttonName);

    if (buttonName == "close") {
      setModalVisible(false);
      console.log(`actionList:`);
      console.log(actionList);
      setActionList([]);
      setTapDetails(null);
    } else {
      console.log("non close action triggered?");
      setActionList((prevState) => [...prevState, { buttonName }]);
    }
  };
  const handleTap = (event) => {
    const { x, y, absoluteX, absoluteY } = event.nativeEvent;
    const timestamp = new Date().toISOString();
    // Set the modal position based on screen coordinates
    setModalPosition({ x: absoluteX, y: absoluteY });
    setModalVisible(true);
    setTapDetails({ timestamp, absoluteX, absoluteY });
  };

  return (
    <ViewTemplate navigation={navigation}>
      <GestureHandlerRootView style={styles.container}>
        <TapGestureHandler onActivated={handleTap}>
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
                      <Text style={styles.txtAction}>
                        Action: {elem.buttonName}
                      </Text>
                    </View>
                  );
                })}
            </View>
            <Text style={styles.tapText}>Tap anywhere inside this view</Text>
          </View>
        </TapGestureHandler>

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
                    left: modalPosition.x - modalRadius * 0.5, // Center modal horizontally
                    top: modalPosition.y - modalRadius * 0.5, // Center modal vertically
                  },
                ]}
              >
                <CircleTouchPad
                  circleRadius={modalRadius}
                  setModalVisible={setModalVisible}
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
    width: modalRadius,
    // padding: 20,
    // borderRadius: 10,
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
