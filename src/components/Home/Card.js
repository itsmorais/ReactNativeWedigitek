import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, Image, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { toggleFavorite, updateRestaurantFavorite } from '../../actions/index';
import { useDispatch } from 'react-redux';

import { useState } from "react";


const Card = ({ restaurant, stateChanger }) => {
  const item = restaurant.item

  const dispatch = useDispatch()
  const navigation = useNavigation();

  const navigateToDetailView = (restaurant) => {
    navigation.navigate('DetailView', { restaurant });
  };

  const changeFavoriteVisibility = (value) => {

    dispatch(updateRestaurantFavorite({ id: value._id }))
    dispatch(toggleFavorite(value))
    stateChanger()
  }

  let url = item.image ? item.image.url : 'https://images.pexels.com/photos/2923034/pexels-photo-2923034.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'

  return (
    <TouchableWithoutFeedback onPress={() => navigateToDetailView(item)}>
      <View style={[styles.card, styles.shadowProp, styles.list]} key={item._id}>
        <Image source={{ uri: url }} style={styles.image}></Image>
        <View style={styles.itens}>
          <Text style={styles.title} key={item._id}>{item.name.toUpperCase()}</Text>
          <TouchableOpacity onPress={() => changeFavoriteVisibility(item)}>
            {item.isFavorite ? (
              <Ionicons name="star" size={35} color="#ffb80e" style={styles.starIcon} />
            ) : (
              <Ionicons name="star-outline" size={35} color="#ffb80e" style={styles.starIcon} />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )

}
const styles = StyleSheet.create({

  starIcon: {
    marginRight: 10,
    textAlign: '',
    alignSelf: 'flex-end'
  },
  image: {
    width: '100%',
    height: 250
  },
  title: {
    fontSize: '20px',
    color:'white'
  },
  itens: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 21,
    justifyContent: 'space-evenly',
    alignItems: 'center'

  },
  list: {
    paddingHorizontal: 21,
  },
  card: {
    backgroundColor: '#ff611d',
    borderRadius: 8,
    paddingVertical: 21,
    paddingHorizontal: 25,
    width: '100%',
    marginVertical: 10,
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },

});

export default Card
