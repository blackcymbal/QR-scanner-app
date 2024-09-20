import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

type CameraControlProps = {
  setIsCameraActive: React.Dispatch<React.SetStateAction<boolean>>;
  flash: boolean;
  setFlash: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function CameraControl({
  setIsCameraActive,
  flash,
  setFlash,
}: CameraControlProps) {
  return (
    <View style={[styles.cameraControls, { backgroundColor: undefined }]}>
      <TouchableOpacity onPress={() => setIsCameraActive(false)}>
        <Ionicons size={28} name="close-outline" color={"#fff"} />
      </TouchableOpacity>
      <View style={{ flexDirection: "row", gap: 32 }}>
        <TouchableOpacity onPress={() => setFlash(!flash)}>
          {flash ? (
            <View style={styles.flashButton}>
              <Ionicons size={28} name="flashlight" color={Colors.light.tint} />
            </View>
          ) : (
            <Ionicons size={28} name="flashlight-outline" color={"#fff"} />
          )}
        </TouchableOpacity>
        <Ionicons size={28} name="qr-code-outline" color={"#fff"} />
        <Ionicons size={28} name="ellipsis-vertical-outline" color={"#fff"} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cameraControls: {
    height: "10%",
    top: 15,
    position: "absolute",
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    zIndex: 1000,
  },
  flashButton: {
    height: 40,
    width: 40,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.6)",
  },
});
