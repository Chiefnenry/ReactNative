import OrderListItem from "@/components/OrderListItem";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useLocalSearchParams, Stack } from "expo-router";
import { FlatList } from "react-native";
import OrderItemListItem from "@/components/OrderItemListItem";
import { useOrderDetails } from "../../../api/orders";
import { ActivityIndicator } from "react-native";
import { useUpdateOrderSubscription } from "../../../api/orders/subsctiption";

export default function OrderDetailsScreen() {
  const { id: idString } = useLocalSearchParams();
  const id = idString ? parseFloat(idString as string) : null;

  const { data: order, isLoading, error } = useOrderDetails(id ?? 0);

  useUpdateOrderSubscription(id ?? 0);

  // const order = orders.find((o) => o.id.toString() === id);

  if (!order) {
    return <ThemedText>Not found</ThemedText>;
  }

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error || !order) {
    return (
      <ThemedView style={{ padding: 10, gap: 20 }}>
        <ThemedText>No order found</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={{ padding: 10, gap: 20 }}>
      <Stack.Screen options={{ title: `Order #${id}` }} />
      <FlatList
        data={order.order_items}
        renderItem={({ item }) => <OrderItemListItem item={item} />}
        contentContainerStyle={{ gap: 10 }}
        ListHeaderComponent={() => <OrderListItem order={order} />}
        keyExtractor={(item, index) => index.toString()}
      />
    </ThemedView>
  );
}
