import React, { useState } from "react";
import {
  Alert,
  Dimensions,
  Modal,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import { RNHoleView } from "react-native-hole-view";
import {
  Camera,
  CameraRuntimeError,
  useCameraDevice,
  useCodeScanner,
} from "react-native-vision-camera";
import CameraControl from "./CameraControl";

let width = Dimensions.get("screen").width;
let height = Dimensions.get("screen").height;

type CameraScannerPrps = {
  isCameraActive: boolean;
  setIsCameraActive: React.Dispatch<React.SetStateAction<boolean>>;
  setRetrivedData: React.Dispatch<React.SetStateAction<null>>;
};

export default function CameraScanner({
  isCameraActive,
  setIsCameraActive,
  setRetrivedData,
}: CameraScannerPrps) {
  const [flash, setFlash] = useState(false);
  const [position, setPosition] = useState({
    height: 0,
    width: 0,
    left: 0,
    top: 0,
  });

  const device = useCameraDevice("back");

  const codeScanner = useCodeScanner({
    codeTypes: ["qr", "ean-13", "upc-a"],
    onCodeScanned: (codes) => {
      if (codes[0].type !== "ean-13") {
        const width = codes[0].corners[1]?.x - codes[0].corners[0]?.x;
        const height = codes[0].corners[2]?.y - codes[0].corners[0]?.y;
        setPosition({
          height: height,
          width: width,
          left: codes[0].corners[0].x,
          top: codes[0].corners[0].y,
        });
      }

      setTimeout(() => {
        setRetrivedData(codes[0].value);
        setIsCameraActive(false);
      }, 1000);
    },
  });

  const onError = (error: CameraRuntimeError) => {
    Alert.alert("Error!", error.message);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Modal presentationStyle="fullScreen">
        <CameraControl
          setIsCameraActive={setIsCameraActive}
          flash={flash}
          setFlash={setFlash}
        />
        {position.left !== 0 &&
          position.left > width * 0.1 &&
          position.top > height * 0.28 &&
          position.top < height * 0.28 + height * 0.4 - position.height && (
            <View
              style={{
                height: position.height * 1.5,
                width: position.width * 1.5,
                borderWidth: 2,
                borderColor: "blue",
                position: "absolute",
                top: position.top + position.top * 0.1,
                left: position.left - position.left * 0.5,
                zIndex: 1000,
              }}
            />
          )}

        <Camera
          style={StyleSheet.absoluteFill}
          torch={flash ? "on" : "off"}
          device={device}
          isActive={isCameraActive}
          codeScanner={codeScanner}
          onError={onError}
        />
        <RNHoleView
          holes={[
            {
              x: width * 0.1,
              y: height * 0.28,
              width: width * 0.8,
              height: height * 0.4,
              borderRadius: 10,
            },
          ]}
          style={[styles.rnholeView, styles.fullScreenCamera]}
        />
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  camera: {
    width: "100%",
    height: 200,
  },
  fullScreenCamera: {
    position: "absolute",
    width: "100%",
    height: "100%",
    flex: 1,
    zIndex: 100,
  },
  rnholeView: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },

  icon: {
    height: 45,
    width: 45,
    borderRadius: 45,
    alignItems: "center",
    justifyContent: "center",
  },
});
