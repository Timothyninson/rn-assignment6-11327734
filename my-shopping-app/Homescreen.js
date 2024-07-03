import React from 'react';
import { View, FlatList, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import Header from './Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const products = [
  { id: '1', name: 'Office Wear', description: 'reversible angora cardigan', price: 120, image: require('./assets/dress1.png') },
  { id: '2', name: 'Black', description: 'reversible angora cardigan', price: 120, image: require('./assets/dress2.png') },
  { id: '3', name: 'Church Wear', description: 'reversible angora cardigan', price: 120, image: require('./assets/dress3.png') },
  { id: '4', name: 'Lamerei', description: 'reversible angora cardigan', price: 120, image: require('./assets/dress4.png') },
  { id: '5', name: '21WN', description: 'reversible angora cardigan', price: 120, image: require('./assets/dress5.png') },
  { id: '6', name: 'Lopo', description: 'reversible angora cardigan', price: 120, image: require('./assets/dress6.png') },
  { id: '7', name: '21WN', description: 'reversible angora cardigan', price: 120, image: require('./assets/dress7.png') },
  { id: '8', name: 'Lame', description: 'reversible angora cardigan', price: 120, image: require('./assets/dress3.png') },
];
const HomeScreen = () => {
  const navigation = useNavigation();

  const addToCart = async (product) => {
    try {
      const cart = await AsyncStorage.getItem('cart');
      const cartItems = cart ? JSON.parse(cart) : [];
      cartItems.push(product);
      await AsyncStorage.setItem('cart', JSON.stringify(cartItems));
      console.log('Product added to cart:', product);
    } catch (error) {
      console.error(error);
    }
  };

  const renderProduct = ({ item }) => (
    <View style={styles.productContainer}>
      <View style={styles.imageContainer}>
        <Image source={item.image} style={styles.productImage} />
        <TouchableOpacity style={styles.addToCartButton} onPress={() => addToCart(item)}>
          <Image source={require('./assets/add_circle.png')} style={styles.addToCartIcon} />
        </TouchableOpacity>
      </View>
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productDescription}>{item.description}</Text>
      <Text style={[styles.productPrice, { color: 'orange' }]}>${item.price}</Text>
    </View>
  );
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Header navigation={navigation} />
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={renderProduct}
          numColumns={2}
          columnWrapperStyle={styles.row}
        />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  productContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'left',
    margin: 5,
    padding: 10,
  },
  imageContainer: {
    position: 'relative',
  },
  productImage: {
    width: 150,
    height: 200,
    resizeMode: 'contain',
  },
  productName: {
    fontSize: 16,
    marginTop: 10,
    textAlign: 'left',
  },
  productDescription: {
    fontSize: 14,
    marginTop: 5,
    textAlign: 'left',
    color: '#888',
  },
  productPrice: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
  addToCartButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  addToCartIcon: {
    width: 24,
    height: 24,
  },
});

export default HomeScreen;
