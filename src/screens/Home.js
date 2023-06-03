import React, { useState, useEffect, useContext } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { View, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useDispatch, ReactReduxContext } from 'react-redux';
import { setFavorites, setRestaurants } from '../actions/index';
import useDidMountEffect from '../hook/useDidMount';
import Card from '../components/Home/Card';
import AsyncStorage from '@react-native-async-storage/async-storage';

const endPoint = 'https://api.dev.wdtek.xyz/restaurants';

const Home = () => {
  const [offset, setOffset] = useState(0);
  const [hasMoreRestarant, setHasMoreRestarant] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([])
  const [render, setRender] = useState(false)
  const dispatch = useDispatch();
  const { store } = useContext(ReactReduxContext)


  const getAllFavorites = async () => {
    const favoritesLoad = await AsyncStorage.getItem('favorites')
    dispatch(setFavorites(JSON.parse(favoritesLoad)))
  }


  const isFocused = useIsFocused()

  useEffect(() => {
    loadRestaurants()
    getAllFavorites()
  }, [isFocused])


  useDidMountEffect(() => {
    setData(store.getState().restaurants)
  }, [render])



  const loadRestaurants = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await fetch(`${endPoint}?limit=2&offset=${offset}`);
      const json = await response.json();
      let restaurants = json.docs;
      const favoritesData = await AsyncStorage.getItem('favorites');
      const favoritesList = JSON.parse(favoritesData);

      dispatch(setRestaurants({ favorites: favoritesList, restaurants }))

      setData(store.getState().restaurants)
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

  const stateChanger = () => {
    setRender(!render)
  }




  return (
    <FlatList
      contentContainerStyle={styles.list}
      data={data}
      renderItem={(item) => <Card stateChanger={stateChanger} restaurant={item} />}
      keyExtractor={(_, index) => String(index)}
      onEndReached={loadRestaurants}
      onEndReachedThreshold={0.1}
      ListFooterComponent={renderFooter}
    />
  );
};

const styles = StyleSheet.create({

  loading: {
    alignSelf: 'center',
    marginVertical: 20,
  },
  list: {
    paddingHorizontal: 13,
  },

});

export default Home;
