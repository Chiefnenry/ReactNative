import OrderListItem from "@/components/OrderListItem";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useLocalSearchParams, Stack } from "expo-router";
import orders from "../../../assets/data/orders"; // Ensure that orders is properly exported from this path
import { FlatList } from "react-native";
import OrderItemListItem from "@/components/OrderItemListItem";

export default function OrderDetailsScreen() {
  const { id } = useLocalSearchParams();
  const order = orders.find(
    (order: { id: { toString: () => string | string[] | undefined } }) =>
      order.id?.toString() === id
  );

  return (
    <ThemedView style={{ padding: 10, gap: 20 }}>
      <Stack.Screen options={{ title: `Order #${id}` }} />
      {order ? (
        <FlatList
          data={order.order_items}
          renderItem={({ item }) => <OrderItemListItem item={item} />}
          contentContainerStyle={{ gap: 10 }}
          ListHeaderComponent={() => <OrderListItem order={order} />}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <ThemedText>No order found</ThemedText>
      )}
    </ThemedView>
  );
}
