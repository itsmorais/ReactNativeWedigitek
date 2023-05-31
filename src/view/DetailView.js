import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setFavorites, toggleFavorite } from '../actions/index';

import AsyncStorage from '@react-native-async-storage/async-storage';

const DetailView = ({ route }) => {
  const { restaurant } = route.params;
  const { name, cuisines, addressInfo, contacts } = restaurant;

  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);


  const loadFavorites = async () => {
    try {
      const favoritesData = await AsyncStorage.getItem('favorites');
      const favoritesList = JSON.parse(favoritesData);
      if (favoritesList) {
        dispatch(setFavorites(favoritesList));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };


  return (
    <SafeAreaView>
      <TouchableOpacity onPress={() => dispatch(toggleFavorite(restaurant))}>
        {favorites.some((fav) => fav._id === restaurant._id) ? (
          <Ionicons name="star" size={24} color="gold" style={styles.starIcon} />
        ) : (
          <Ionicons name="star-outline" size={24} color="gold" style={styles.starIcon} />
        )}
      </TouchableOpacity>

      <Text>Nome do Restaurante: {name}</Text>
      <Text>Tipo de cozinha:</Text>
      {cuisines.length > 0 ? (
        cuisines.map((cuisine) => <Text key={cuisine._id}>{cuisine.name['pt-BR']}</Text>)
      ) : (
        <Text>Desconhecido</Text>
      )}
      <Text>Endereço:</Text>
      {addressInfo ? (
        <>
          <Text>
            {addressInfo.address} {addressInfo.city}-{addressInfo.country}
          </Text>
          {addressInfo.postalCode && <Text>Código Postal:{addressInfo.postalCode}</Text>}
        </>
      ) : (
        <Text>Desconhecido</Text>
      )}

      <Text>E-mail: {contacts.email}</Text>
      <Text>Telefone: {contacts.phoneNumber}</Text>
    </SafeAreaView>
  );
};



const styles = StyleSheet.create({
  starIcon: {
    marginRight: 25,
    textAlign: 'right',
  },
});

export default DetailView;
