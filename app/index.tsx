import CameraScanner from "@/components/camera/CameraScanner";
import NoCameraDeviceError from "@/components/camera/NoCameDeviceError";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import {
  useCameraDevice,
  useCameraPermission,
} from "react-native-vision-camera";

export default function Home() {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [retrivedData, setRetrivedData] = useState(null);
  const device = useCameraDevice("back");

  const { hasPermission, requestPermission } = useCameraPermission();

  useEffect(() => {
    requestPermission();
  }, []);

  const handleOpenCamera = () => {
    if (hasPermission) {
      setIsCameraActive(true);
    } else {
      requestPermission();
    }
  };

  if (device == null) return <NoCameraDeviceError />;

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="subtitle">Retrived Data:</ThemedText>
      <ThemedText type="link" style={{ marginBottom: 32 }}>
        {retrivedData}
      </ThemedText>
      <TouchableOpacity onPress={handleOpenCamera} style={styles.button}>
        <ThemedText>Open Camera</ThemedText>
      </TouchableOpacity>
      {isCameraActive && (
        <CameraScanner
          isCameraActive={isCameraActive}
          setIsCameraActive={setIsCameraActive}
          setRetrivedData={setRetrivedData}
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  button: {
    paddingHorizontal: 28,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: Colors.light.tint,
    borderRadius: 8,
  },
});
