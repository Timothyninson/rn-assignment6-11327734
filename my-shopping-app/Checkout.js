import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CheckoutScreen = () => {
  const navigation = useNavigation();
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const cartData = await AsyncStorage.getItem('cart');
        if (cartData) {
          setCartItems(JSON.parse(cartData));
          calculateTotal(JSON.parse(cartData));
        }
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };
    fetchCartItems();
  }, []);

  const calculateTotal = (items) => {
    let totalAmount = 0;
    items.forEach((item) => {
      totalAmount += item.price * item.quantity;
    });
    setTotal(totalAmount);
  };

  const renderCartItem = (item) => (
    <View style={styles.cartItem} key={item.id}>
      <Text style={styles.cartItemName}>{item.name}</Text>
      <Text style={styles.cartItemPrice}>${item.price * item.quantity}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.checkoutItems}>
        {cartItems.map(renderCartItem)}
      </View>
      <View style={styles.checkoutSummary}>
        <Text style={styles.checkoutSummaryLabel}>Checkout</Text>
        <View style={styles.checkoutSummaryItem}>
          <Text style={styles.checkoutSummaryText}>Est. Total</Text>
          <Text style={styles.checkoutSummaryPrice}>${total}</Text>
        </View>
        <TouchableOpacity style={styles.checkoutButton} onPress={() => {
          // TODO: Add your checkout logic here
          console.log('Proceed to checkout');
        }}>
          <Text style={styles.checkoutButtonText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  checkoutItems: {
    marginBottom: 20,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cartItemName: {
    fontSize: 16,
  },
  cartItemPrice: {
    fontSize: 16,
  },
  checkoutSummary: {
    backgroundColor: '#f2f2f2',
    padding: 20,
    borderRadius: 10,
  },
  checkoutSummaryLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  checkoutSummaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkoutSummaryText: {
    fontSize: 16,
  },
  checkoutSummaryPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  checkoutButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
  },
});

export default CheckoutScreen;