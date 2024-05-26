import { StyleSheet, Platform, Image } from "react-native";

// import { HelloWave } from "@/src/components/HelloWave";
import ParallaxScrollView from "@/src/components/ParallaxScrollView";
import { ThemedText } from "@/src/components/ThemedText";
import { ThemedView } from "@/src/components/ThemedView";
import { Colors } from "../constants/Colors";
import { products } from "../assets/data/products";

// const product = products[0];

const ProductListItem = ({ product }) => {
  return (
    <ParallaxScrollView>
      <ThemedView style={styles.titleContainer}>
        <Image source={{ url: product.image }} style={styles.image} />
        <ThemedText style={styles.title}>{product.name}</ThemedText>
        <ThemedText style={styles.price}>${product.price}</ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
};

export default ProductListItem;

const styles = StyleSheet.create({
  titleContainer: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 20,
  },

  image: {
    width: "100%",
    aspectRatio: 1,
  },

  title: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 10,
    color: "#000",
  },

  price: {
    color: Colors.light.tint,
    fontWeight: "bold",
  },
});
