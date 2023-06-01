import React, { useEffect, useContext, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useDispatch, ReactReduxContext } from 'react-redux';
import { toggleFavorite, updateRestaurantFavorite } from '../actions/index';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

const DetailView = ({ route }) => {
  const { _id } = route.params.restaurant;
  const { store } = useContext(ReactReduxContext);
  const dispatch = useDispatch();
  const [data, setData] = useState(route.params.restaurant);
  const [isFontsLoaded] = useFonts({
    'dmSans-regular': require('../assets/fonts/DMSans-Regular.ttf'),
    'dmSans-bold': require('../assets/fonts/DMSans-Bold.ttf'),
    'dmSans-italic':require('../assets/fonts/DMSans-Italic.ttf')
  });

  SplashScreen.preventAutoHideAsync();

  useEffect(() => {
    loadData();
  }, []);

  const changeFavoriteVisibility = (item) => {
    dispatch(updateRestaurantFavorite({ id: item._id }));
    dispatch(toggleFavorite(item));
    item = {
      ...item,
      isFavorite: !item.isFavorite,
    };
    setData(item);
  };

  const loadData = () => {
    let restaurant = store.getState().restaurants;
    restaurant = restaurant.find((Item) => Item._id == _id);
    setData(restaurant);
  };

  let url = data.image
    ? data.image.url
    : 'https://images.pexels.com/photos/2923034/pexels-photo-2923034.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

  const handleOnLayout = async () => {
    if (isFontsLoaded) {
      await SplashScreen.hideAsync();
    }
  };

  if (!isFontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={{ backgroundColor: '#ff611d', flex: 1 }}>
      <View style={styles.imageContainer} onLayout={handleOnLayout}>
        <Image source={{ uri: url }} style={styles.image} />
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => changeFavoriteVisibility(data)}
          activeOpacity={0.8}
        >
          {data.isFavorite ? (
            <Ionicons name="star" size={35} color="gold" />
          ) : (
            <Ionicons name="star-outline" size={35} color="gold" />
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>Nome do Restaurante:</Text>
        <Text style={styles.detalhes}>{data.name}</Text>
        <Text style={styles.title}>Tipo de cozinha:</Text>
        {data.cuisines.length > 0 ? (
          data.cuisines.map((cuisine) => (
            <Text style={styles.detalhes} key={cuisine._id}>
              {cuisine.name['pt-BR']}
            </Text>
          ))
        ) : (
          <Text style={styles.desconhecido}>-</Text>
        )}
        <Text style={styles.title}>Endereço:</Text>
        {data.addressInfo ? (
          <>
            <Text style={styles.detalhes}>
              {data.addressInfo.address} {data.addressInfo.city}-{data.addressInfo.country}
            </Text>
            {data.addressInfo.postalCode && (
              <Text style={styles.detalhes}>Código Postal:{data.addressInfo.postalCode}</Text>
            )}
          </>
        ) : (
          <Text style={styles.desconhecido}>-</Text>
        )}
        <Text style={styles.title}>Contato:</Text>
        <Text style={styles.detalhes}>E-mail: {data.contacts.email}</Text>
        <Text style={styles.detalhes}>Telefone: {data.contacts.phoneNumber}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    position: 'relative',
  },
  favoriteButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
  },
  image: {
    width: '100%',
    height: 200,
  },
  title: {
    fontSize: 21,
    color: 'whitesmoke',
    textAlign: 'center',
    marginTop: 35,
    fontWeight: 'bold',
    fontFamily: 'dmSans-bold',
    textTransform:'uppercase'
  },
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  desconhecido: {
    fontSize:21,
    color: 'white',
    fontFamily:'dmSans-italic'
  },
  detalhes: {
    fontSize: 21,
    textAlign:'center',
    color: 'whitesmoke',
    fontFamily:'dmSans-regular',
    textTransform:'capitalize'
  },
});

export default DetailView;
