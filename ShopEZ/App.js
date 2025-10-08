import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { View, TouchableOpacity, Text } from 'react-native';
import { auth, database } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { ref, onValue, off } from 'firebase/database';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import ProductListScreen from './src/screens/ProductListScreen';
import ProductDetailScreen from './src/screens/ProductDetailScreen';
import CartScreen from './src/screens/CartScreen';
import LoadingSpinner from './src/components/LoadingSpinner';

const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribeAuth;
  }, []);

  
  useEffect(() => {
    if (!user) {
      setCartCount(0);
      return;
    }

    const cartRef = ref(database, `carts/${user.uid}`);
    const unsubscribeCart = onValue(cartRef, (snapshot) => {
      const cartData = snapshot.val();
      if (cartData) {
        const totalItems = Object.values(cartData).reduce((total, item) => total + item.quantity, 0);
        setCartCount(totalItems);
      } else {
        setCartCount(0);
      }
    });

    return () => off(cartRef);
  }, [user]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator>
        {!user ? (
          <>
            <Stack.Screen 
              name="Login" 
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="Register" 
              component={RegisterScreen}
              options={{ title: 'Create Account' }}
            />
          </>
        ) : (
          <>
            <Stack.Screen 
              name="ProductList" 
              component={ProductListScreen}
              options={({ navigation }) => ({ 
                title: 'ShopEZ Products',
                headerRight: () => (
                  <HeaderButtons navigation={navigation} cartCount={cartCount} />
                )
              })}
            />
            <Stack.Screen 
              name="ProductDetail" 
              component={ProductDetailScreen}
              options={{ title: 'Product Details' }}
            />
            <Stack.Screen 
              name="Cart" 
              component={CartScreen}
              options={{ title: 'Your Cart' }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const HeaderButtons = ({ navigation, cartCount }) => (
  <TouchableOpacity 
    style={headerStyles.container}
    onPress={() => navigation.navigate('Cart')}
  >
    <Text style={headerStyles.cartText}>🛒</Text>
    {cartCount > 0 && (
      <View style={headerStyles.badge}>
        <Text style={headerStyles.badgeText}>
          {cartCount > 99 ? '99+' : cartCount}
        </Text>
      </View>
    )}
  </TouchableOpacity>
);

const headerStyles = {
  container: {
    marginRight: 15,
    position: 'relative',
  },
  cartText: {
    fontSize: 20,
  },
  badge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
};