import type { Product } from '@/src/types';
import { Link, useSegments } from 'expo-router';
import { Image, Pressable, StyleSheet, Text } from 'react-native';
import { Colors } from '../constants/Colors';

type ProductListItemProps = {
  product: Product;
};

const ProductListItem = ({ product }: ProductListItemProps) => {
  const segments = useSegments();

  if (segments[0] !== '(user)' && segments[0] !== '(admin)') {
    return null;
  }

  return (
    <Link href={`/${segments[0]}/menu/${product.id}`} asChild>
      <Pressable style={styles.container}>
        <Image style={styles.image} source={{ uri: product.image_url }} />
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>{product.price}$</Text>
      </Pressable>
    </Link>
  );
};

export default ProductListItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 5,
    backgroundColor: '#fff',
    borderRadius: 20,
  },
  image: {
    width: '80%',
    aspectRatio: 1,
    borderRadius: 20,
  },
  title: {
    fontSize: 18,
  },
  price: {
    fontSize: 15,
    fontWeight: '200',
    color: Colors.light.tint,
  },
});
