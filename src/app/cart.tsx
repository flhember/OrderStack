import { useCart } from '@/src/providers/CartProvider';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { FlatList, Platform, Text, View } from 'react-native';
import Button from '../components/Button';
import CartListItem from '../components/CartListItem';

const CartScreen = () => {
  const { items, total } = useCart();

  return (
    <View style={{ padding: 10 }}>
      <StatusBar style={Platform.OS == 'ios' ? 'light' : 'auto'} />

      <FlatList
        data={items}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        contentContainerStyle={{ padding: 10, gap: 10 }}
      />
      <Text style={{ marginTop: 20, fontSize: 20, fontWeight: '500' }}>
        Total: ${total.toFixed(2)}
      </Text>
      <Button
        text={`Checkout`}
        onPress={() => console.warn('Checkout pressed')}
      />
    </View>
  );
};

export default CartScreen;
