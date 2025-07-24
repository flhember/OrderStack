import orders from '@/assets/data/order';
import OrderListItem from '@/src/components/OrderListItem';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

export default function OrdersScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        renderItem={({ item }) => <OrderListItem order={item} />}
        contentContainerStyle={{ padding: 10, gap: 10 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
