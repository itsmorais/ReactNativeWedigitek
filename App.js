import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import Detail from './src/screens/Detail';
import { Provider } from 'react-redux';
import store from './src/store/index';
const Stack = createNativeStackNavigator();
import { StatusBar } from 'expo-status-bar';



function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle='dark-content'></StatusBar>
      <Provider store={store}>
        <Stack.Navigator>

          <Stack.Screen name='Home' component={Home} options={{
            title: 'Home',
            headerStyle: {
              backgroundColor: '#ff611d',
            },
            headerTintColor: 'whitesmoke',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}></Stack.Screen>
          <Stack.Screen name='DetailView' component={Detail} options={{
            title: 'Detail',
            headerStyle: {
              backgroundColor: 'white',
            },
            headerTintColor: '#ff611d',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}></Stack.Screen>
        </Stack.Navigator>
      </Provider>

    </NavigationContainer>
  );
}

export default App