import { Link, useSegments } from 'expo-router';
import { Pressable, StyleSheet, Text } from 'react-native';
import { defaultImage } from '../../assets/data/products';
import { Colors } from '../constants/Colors';
import { Tables } from '../database.types';
import RemoteImage from './RemoteImage';

type ProductListItemProps = {
  product: Tables<'products'>;
};

const ProductListItem = ({ product }: ProductListItemProps) => {
  const segments = useSegments();

  if (segments[0] !== '(user)' && segments[0] !== '(admin)') {
    return null;
  }

  return (
    <Link href={`/${segments[0]}/menu/${product.id}`} asChild>
      <Pressable style={styles.container}>
        <RemoteImage
          style={styles.image}
          path={product.image}
          fallback={defaultImage}
        />
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
    maxWidth: '50%',
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
