import OrderListItem from "@/components/OrderListItem";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useLocalSearchParams, Stack } from "expo-router";
import orders from "../../../assets/data/orders"; // Ensure that orders is properly exported from this path
import { FlatList, Pressable } from "react-native";
import OrderItemListItem from "@/components/OrderItemListItem";
import { Colors } from "../../../constants/Colors";
import { OrderStatusList } from "../../../types";

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
          ListFooterComponent={() => (
            <>
              <ThemedText style={{ fontWeight: "bold" }}>Status</ThemedText>
              <ThemedView style={{ flexDirection: "row", gap: 5 }}>
                {OrderStatusList.map((status) => (
                  <Pressable
                    key={status}
                    onPress={() => console.warn("Update status")}
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
      ) : (
        <ThemedText>No order found</ThemedText>
      )}
    </ThemedView>
  );
}
