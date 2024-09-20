import React from "react";
import { StyleSheet } from "react-native";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";

const NoCameraDeviceError = () => {
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.errorText}>No Camera Device Found</ThemedText>
      <ThemedText style={styles.subText}>
        It seems like we can't detect a camera on this device. Please ensure
        your camera is working and try again.
      </ThemedText>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  errorText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#ff4d4d",
  },
  subText: {
    marginBottom: 20,
  },
});

export default NoCameraDeviceError;
