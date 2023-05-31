import React, { useEffect, useContext, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet,Image } from 'react-native';
import { useDispatch, ReactReduxContext } from 'react-redux';
import { toggleFavorite, updateRestaurantFavorite } from '../actions/index';

const DetailView = ({ route }) => {
  const { _id } = route.params.restaurant;
  const { store } = useContext(ReactReduxContext)
  const dispatch = useDispatch();
  const [data, setData] = useState(route.params.restaurant)


  useEffect(() => {
    loadData()
  }, [])

  const changeFavoriteVisibility = (item) => {

    dispatch(updateRestaurantFavorite({ id: item._id }))
    dispatch(toggleFavorite(item))
    item = {
      ...item,
      isFavorite: !item.isFavorite
    }
    setData(item)
  }


  const loadData = () => {
    let restaurant = store.getState().restaurants

    restaurant = restaurant.find((Item) => Item._id == _id)


    setData(restaurant)

  }

  let url = data.image ? data.image.url : 'https://images.pexels.com/photos/2923034/pexels-photo-2923034.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'

  return (
    <SafeAreaView style={{backgroundColor:'#ff611d',flex:1}}> 
      <Image source={{ uri: url }} style={styles.image}></Image>

      <TouchableOpacity onPress={() => changeFavoriteVisibility(data)}>
        {data.isFavorite ? (
          <Ionicons name="star" size={35} color="#ffb80e" style={styles.starIcon} />
        ) : (
          <Ionicons name="star-outline" size={35} color="#ffb80e" style={styles.starIcon} />
        )}
      </TouchableOpacity>

  <View style={styles.container}>
      <Text style={styles.title}>Nome do Restaurante:</Text>
      <Text style={styles.detalhes}>{data.name}</Text>
      <Text style={styles.title}>Tipo de cozinha:</Text>
      {data.cuisines.length > 0 ? (
        data.cuisines.map((cuisine) => <Text style={styles.detalhes} key={cuisine._id}>{cuisine.name['pt-BR']}</Text>)
      ) : (
        <Text style={styles.desconhecido} >Desconhecido</Text>
      )}
      <Text style={styles.title}>Endereço:</Text>
      {data.addressInfo ? (
        <>
          <Text style={styles.detalhes}>
            {data.addressInfo.address} {data.addressInfo.city}-{data.addressInfo.country}
          </Text>
          {data.addressInfo.postalCode && <Text style={styles.detalhes} >Código Postal:{data.addressInfo.postalCode}</Text>}
        </>
      ) : (
        <Text style={styles.desconhecido} >Desconhecido</Text>
      )}
  <Text style={styles.title}>Contato:</Text>
      <Text  style={styles.detalhes}>E-mail: {data.contacts.email}</Text>
      <Text  style={styles.detalhes}>Telefone: {data.contacts.phoneNumber}</Text>
      </View>
    </SafeAreaView>
  );
};



const styles = StyleSheet.create({
  starIcon: {
    marginRight: 25,
    textAlign: 'right',
  },
  image: {
    width: '100%',
    height: 200
  },
  title: {
    fontSize: '25px',
    color:'whitesmoke',
    textAlign:'center',
    marginTop: 35
  },
  container:{
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:8
  },
  desconhecido:{
    color:'red'
  },
  detalhes:{
    fontSize: '25px',
    color:'#ffb80e',
    textAlign:'center'
  }
});

export default DetailView;
