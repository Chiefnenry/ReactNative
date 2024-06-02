// OrderScreen.tsx
import React from "react";
import { FlatList } from "react-native";
// import { Order } from "../../../types";
import orders from "../../../../assets/data/orders";
import OrderItemListItem from "@/components/OrderListItem";
// import OrderItemListItem from "@/components/OrderListItem";

const OrderScreen: React.FC = () => {
  return (
    <FlatList
      data={orders}
      renderItem={({ item }) => <OrderItemListItem order={item} />}
      contentContainerStyle={{ gap: 10, padding: 10 }}
    />
  );
};

export default OrderScreen;
