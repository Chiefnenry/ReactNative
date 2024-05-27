import React, { useState } from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "../constants/Colors";

export default function CustomModal() {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModalVisibility = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleModalVisibility} style={styles.button}>
        <Text style={styles.buttonText}>Show Modal</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModalVisibility}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>This is a Modal!</Text>
            <TouchableOpacity
              onPress={toggleModalVisibility}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Close Modal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.light.background,
  },
  button: {
    backgroundColor: Colors.light.tint,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: 300,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
  },
});
