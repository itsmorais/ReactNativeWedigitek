import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Image, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import AsyncStorage from '@react-native-async-storage/async-storage';
const endPoint = 'https://api.dev.wdtek.xyz/restaurants';

const CardComponent = () => {
  const [data, setData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMoreRestarant, setHasMoreRestarant] = useState(true);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    loadRestaurants();
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const favoritesData = await AsyncStorage.getItem('favorites');
      const favoritesList = JSON.parse(favoritesData);
      if (favoritesList) {
        setFavorites(favoritesList);
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  const loadRestaurants = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await fetch(`${endPoint}?limit=2&offset=${offset}`);
      const json = await response.json();
      const restaurants = json.docs;

      setData((prevData) => [...prevData, ...restaurants]);
      setOffset((prevOffset) => prevOffset + 2);
      setLoading(false);
      setHasMoreRestarant(json.hasNextPage);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const renderFooter = () => {
    if (!loading || !hasMoreRestarant) {
      return null;
    }

    return (
      <View style={styles.loading}>
        <ActivityIndicator />
      </View>
    );
  };

  const renderItem = ({ item }) => (
    <TouchableWithoutFeedback onPress={() => navigateToDetailView(item)}>
      <View style={styles.listItem} key={item._id}>
        <Text key={item._id}>{item.name.toUpperCase()}</Text>
        <TouchableOpacity onPress={() => toggleFavorite(item)}>
          {favorites.some((fav) => fav._id === item._id) ? (
            <Ionicons name="star" size={24} color="gold" style={styles.starIcon} />
          ) : (
            <Ionicons name="star-outline" size={24} color="gold" style={styles.starIcon} />
          )}
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );

  const navigateToDetailView = (restaurant) => {
    navigation.navigate('DetailView', { restaurant });
  };

  const toggleFavorite = async (restaurant) => {
    const isFavorite = favorites.some((fav) => fav._id === restaurant._id);

    let updatedFavorites = [];
    if (isFavorite) {
      updatedFavorites = favorites.filter((fav) => fav._id !== restaurant._id);
    } else {
      updatedFavorites = [...favorites, restaurant];
    }

    setFavorites(updatedFavorites);

    try {
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error('Error storing favorites:', error);
    }
  };

  return (
    <FlatList
      style={{ marginTop: 30 }}
      contentContainerStyle={styles.list}
      data={data}
      renderItem={renderItem}
      keyExtractor={(_, index) => String(index)}
      onEndReached={loadRestaurants}
      onEndReachedThreshold={0.1}
      ListFooterComponent={renderFooter}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 20,
  },
  listItem: {
    backgroundColor: '#EEE',
    marginTop: 20,
    padding: 50,
  },
  loading: {
    alignSelf: 'center',
    marginVertical: 20,
  },
  starIcon: {
    marginRight: 10,
    textAlign:'right'
  },
});

export default CardComponent;
