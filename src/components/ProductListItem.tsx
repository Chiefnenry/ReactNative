import { StyleSheet, Platform, Image } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "../constants/Colors";
import { products } from "../assets/data/products";
import { Product } from "../types";

type ProductListItemProps = {
  product: Product;
};

const ProductListItem = ({ product }: ProductListItemProps) => {
  return (
    <ParallaxScrollView>
      <ThemedView style={styles.titleContainer}>
        <Image
          source={{ url: product.image }}
          style={styles.image}
          resizeMode="contain"
        />
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
    flex: 1,
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