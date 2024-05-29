import { StyleSheet, TextInput, Image, Alert } from "react-native";
import React, { useState } from "react";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import Button from "@/components/Button";
import { defaultPizzaImage } from "@/components/ProductListItem";
import { Colors } from "../../../constants/Colors";
import * as ImagePicker from "expo-image-picker";
import { Stack, useLocalSearchParams } from "expo-router";

const CreateProductScreen = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const { id } = useLocalSearchParams();
  const isUpdating = !!id;

  const resetFields = () => {
    setName("");
    setPrice("");
  };

  const validateInput = () => {
    setErrors("");
    if (!name) {
      setErrors("Name is required");
      return false;
    }
    if (!price) {
      setErrors("Price is required");
      return false;
    }
    if (isNaN(parseFloat(price))) {
      setErrors("Price is not a number");
      return false;
    }
    return true;
  };

  const onsubmit = () => {
    if (isUpdating) {
      // update
      onUpdateCreate();
    } else {
      onCreate();
    }
  };

  const onUpdateCreate = () => {
    if (!validateInput()) {
      return;
    }
    console.warn("Updating product: ", name);
    // Save in the database
    resetFields();
  };

  const onCreate = () => {
    if (!validateInput()) {
      return;
    }
    console.warn("Creating product: ", name);
    // Save in the database
    resetFields();
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onDelete = () => {
    console.warn("DELETE!!!!!!!");
  };
  const confrimDelete = () => {
    Alert.alert("Confirm", "Are you sure you want to delete this product", [
      {
        text: "Cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: onDelete,
      },
    ]);
  };
  return (
    <ThemedView style={styles.container}>
      <Stack.Screen
        options={{ title: isUpdating ? "Update Product" : "Creating Product" }}
      />
      <Image
        source={{ uri: image || defaultPizzaImage }}
        style={styles.image}
      />
      <ThemedText onPress={pickImage} style={styles.textButton}>
        Select Image
      </ThemedText>
      <ThemedText style={styles.label}>Name</ThemedText>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Name"
        style={styles.input}
      />
      <ThemedText style={styles.label}>Price ($)</ThemedText>
      <TextInput
        value={price}
        onChangeText={setPrice}
        placeholder="9.99"
        style={styles.input}
        keyboardType="numeric"
      />
      {errors ? (
        <ThemedText style={{ color: "red" }}>{errors}</ThemedText>
      ) : null}
      <Button onPress={onsubmit} text={isUpdating ? "Update" : "Create"} />
      {isUpdating && (
        <ThemedText onPress={confrimDelete} style={styles.textButton}>
          Delete
        </ThemedText>
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 20,
  },
  label: {
    color: "gray",
    fontSize: 16,
  },

  image: {
    width: "50%",
    aspectRatio: 1,
    alignSelf: "center",
  },

  textButton: {
    alignSelf: "center",
    fontWeight: "bold",
    color: Colors.light.tint,
    marginTop: 10,
  },
});

export default CreateProductScreen;
