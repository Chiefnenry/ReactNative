import OrderListItem from "@/components/OrderListItem";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useLocalSearchParams, Stack } from "expo-router";
// import orders from "../../../assets/data/orders"; // Ensure that orders is properly exported from this path
import { ActivityIndicator, FlatList, Pressable } from "react-native";
import OrderItemListItem from "@/components/OrderItemListItem";
import { Colors } from "../../../constants/Colors";
import { OrderStatusList } from "../../../types";
import { useOrderDetails, useUpdateOrder } from "../../../api/orders";

export default function OrderDetailsScreen() {
  const { id: idString } = useLocalSearchParams();
  const id = idString ? parseFloat(idString as string) : null;

  const { data: order, isLoading, error } = useOrderDetails(id ?? 0);
  const { mutate: updateOrder } = useUpdateOrder();

  const updateStatus = (status: string) => {
    if (id !== null) {
      updateOrder({ id: id, updatedField: { status } });
    }
  };

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
        ListFooterComponent={() => (
          <>
            <ThemedText style={{ fontWeight: "bold" }}>Status</ThemedText>
            <ThemedView style={{ flexDirection: "row", gap: 5 }}>
              {OrderStatusList.map((status) => (
                <Pressable
                  key={status}
                  onPress={() => updateStatus(status)}
                  style={{
                    borderColor: Colors.light.tint,
                    borderWidth: 1,
                    padding: 10,
                    borderRadius: 5,
                    marginVertical: 10,
                    backgroundColor:
                      order.status === status
                        ? Colors.light.tint
                        : "transparent",
                  }}
                >
                  <ThemedText
                    style={{
                      color:
                        order.status === status ? "white" : Colors.light.tint,
                    }}
                  >
                    {status}
                  </ThemedText>
                </Pressable>
              ))}
            </ThemedView>
          </>
        )}
      />
    </ThemedView>
  );
}
