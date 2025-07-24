import orders from '@/assets/data/order';
import OrderItemListItem from '@/src/components/OrderItemListItem';
import OrderListItem from '@/src/components/OrderListItem';
import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

export default function OrderDetailScreen() {
  const { id } = useLocalSearchParams();
  const order = orders.find((o) => o.id.toString() === id);

  if (!order) {
    return <Text>Order not found</Text>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `Order #${id}` }} />
      <OrderListItem order={order} />
      <FlatList
        data={order.order_items}
        renderItem={({ item }) => <OrderItemListItem item={item} />}
        contentContainerStyle={{ gap: 10 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    gap: 20,
  },
});
