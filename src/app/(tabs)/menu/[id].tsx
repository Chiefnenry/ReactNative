import { StyleSheet, Image, Pressable } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import { Colors } from "../../../constants/Colors";
import products from "../../../assets/data/products";
import { useState } from "react";
import { getBackgroundColorAsync } from "expo-system-ui";
import Button from "@/components/Button";

const sizes = ["S", "M", "L", "XL"];

const PoductDetailsScreen = () => {
  const { id } = useLocalSearchParams();

  const [selectedSize, setSelectedSize] = useState("M");

  const product = products.find((p) => p.id.toString() === id);

  const addToCart = () => {
    console.warn("Adding to cart, size:", selectedSize);
  };
  if (!product) {
    return <ThemedText>Product not found</ThemedText>;
  }
  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ title: product?.name }} />
      <Image source={{ uri: product.image }} style={styles.image} />

      <ThemedText style={styles.select}>Select size</ThemedText>
      <ThemedView style={styles.sizes}>
        {sizes.map((size) => (
          <Pressable
            onPress={() => {
              setSelectedSize(size);
            }}
            style={[
              styles.size,
              {
                backgroundColor: selectedSize === size ? "gainsboro" : "white",
              },
            ]}
            key={size}
          >
            <ThemedText
              style={[
                styles.sizeText,
                {
                  color: selectedSize === size ? "black" : "gray",
                },
              ]}
            >
              {size}
            </ThemedText>
          </Pressable>
        ))}
      </ThemedView>

      <ThemedText style={styles.price}>${product.price}</ThemedText>
      <Button onPress={addToCart} text="Add to cart" />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 10,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.light.tint,
    marginTop: "auto",
  },

  select: {
    color: Colors.light.tint,
    fontSize: 18,
    fontWeight: "bold",
  },

  sizes: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "white",
    marginVertical: 10,
  },

  size: {
    backgroundColor: "gainsboro",
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },

  sizeText: {
    fontSize: 20,
    fontWeight: "500",
    color: Colors.light.tint,
  },
});

export default PoductDetailsScreen;
