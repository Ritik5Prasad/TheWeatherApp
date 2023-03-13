import React from 'react';
import {
  NavigationContainer,
} from '@react-navigation/native';
import 'react-native-gesture-handler';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../Screens/HomeScreen';
import ForecastScreen from '../Screens/ForecastScreen';



const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ForecastScreen" component={ForecastScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
