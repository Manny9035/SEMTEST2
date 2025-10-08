import React, { useState } from 'react';
import {View,Text,Image,ScrollView,TouchableOpacity,StyleSheet,Alert,ActivityIndicator} from 'react-native';
import { auth, database } from '../../firebase';
import { ref, set } from 'firebase/database';

const ProductDetailScreen = ({ route, navigation }) => {
  const { product } = route.params;
  const [loading, setLoading] = useState(false);

  const addToCart = async () => {
    const userId = auth.currentUser?.uid;
    if (!userId) {
      Alert.alert('Error', 'You must be logged in to add items to cart');
      return;
    }

    setLoading(true);
    try {
      const cartItem = {
        ...product,
        quantity: 1,
        addedAt: Date.now()
      };

      const cartRef = ref(database, `carts/${userId}/${product.id}`);
      await set(cartRef, cartItem);
      
      Alert.alert('Success', 'Product added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      Alert.alert('Error', 'Failed to add product to cart');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Image 
        source={{ uri: product.image }} 
        style={styles.image}
        resizeMode="contain"
      />
      
      <View style={styles.content}>
        <Text style={styles.title}>{product.title}</Text>
        
        <View style={styles.priceRatingContainer}>
          <Text style={styles.price}>${product.price}</Text>
          <View style={styles.rating}>
            <Text style={styles.ratingText}>
              ⭐ {product.rating?.rate || 'N/A'} ({product.rating?.count || 0} reviews)
            </Text>
          </View>
        </View>

        <View style={styles.categoryContainer}>
          <Text style={styles.category}>{product.category}</Text>
        </View>

        <Text style={styles.description}>{product.description}</Text>

        <TouchableOpacity 
          style={[styles.addToCartButton, loading && styles.addToCartButtonDisabled]}
          onPress={addToCart}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.addToCartText}>
              Add to Cart
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.viewCartButton}
          onPress={() => navigation.navigate('Cart')}
        >
          <Text style={styles.viewCartText}>View Cart</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    height: 300,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    lineHeight: 30,
  },
  priceRatingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  rating: {
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  ratingText: {
    fontSize: 14,
    color: '#666',
  },
  categoryContainer: {
    backgroundColor: '#f0f8ff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  category: {
    fontSize: 14,
    color: '#007AFF',
    textTransform: 'capitalize',
    fontWeight: '500',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
    marginBottom: 30,
  },
  addToCartButton: {
    backgroundColor: '#34C759',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  addToCartButtonDisabled: {
    backgroundColor: '#ccc',
  },
  addToCartText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  viewCartButton: {
    backgroundColor: '#007AFF',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  viewCartText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProductDetailScreen;