import { FlatList, Platform, Image, ActivityIndicator } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import ProductListItem from "../../../components/ProductListItem";
import { useProductList } from "../../../api/products";

export default function MenuScreen() {
  const { data: products, error, isLoading } = useProductList();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <ThemedText>Failed to fetch products</ThemedText>;
  }

  return (
    <FlatList
      data={products}
      renderItem={({ item }) => <ProductListItem product={item} />}
      numColumns={2}
      contentContainerStyle={{ gap: 10, padding: 10 }}
      columnWrapperStyle={{ gap: 10 }}
    />
  );
}
