import { StyleSheet, Image, Pressable } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Colors } from "../../../constants/Colors";
import products from "../../../assets/data/products";
import { useState } from "react";
// import { getBackgroundColorAsync } from "expo-system-ui";
import Button from "@/components/Button";
import { useCart } from "../../../provider/CartProvider";
import { PizzaSize } from "../../../types";
// import { useRouter } from "expo-router";

const sizes: PizzaSize[] = ["S", "M", "L", "XL"];

const PoductDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const { addItem } = useCart();

  const router = useRouter();

  const [selectedSize, setSelectedSize] = useState<PizzaSize>("M");

  const product = products.find((p) => p.id.toString() === id);

  const addToCart = () => {
    if (!product) {
      return;
    }
    addItem(product, selectedSize);
    router.push("/cart");
  };
  if (!product) {
    return <ThemedText>Product not found</ThemedText>;
  }
  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ title: product?.name }} />
      <Image source={{ uri: product.image }} style={styles.image} />

      {/* <ThemedText style={styles.select}>Select size</ThemedText> */}

      <ThemedText style={styles.title}>${product.name}</ThemedText>
      <ThemedText style={styles.price}>${product.price}</ThemedText>
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
  },

  title: {
    color: Colors.light.tint,
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default PoductDetailsScreen;
