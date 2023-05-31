import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CardComponent from './src/components/CardComponent';
import DetailView from './src/view/DetailView';
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator>
    
    <Stack.Screen name='Home' component={CardComponent}></Stack.Screen>
    <Stack.Screen name='DetailView' component={DetailView}></Stack.Screen>
    </Stack.Navigator>

    </NavigationContainer>
  );
}

export default App