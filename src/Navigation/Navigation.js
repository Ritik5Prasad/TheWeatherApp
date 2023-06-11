import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../Screens/HomeScreen';
import ForecastScreen from '../Screens/ForecastScreen';
import OnBoardingScreen from '../Screens/OnBoardingScreen';
import {useSelector} from 'react-redux';
import {Platform} from 'react-native';
import CityScreen from '../Screens/CityScreen';
import CityForecast from '../Screens/CityForecast';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const state = useSelector(state => state.weather);
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="OnBoardingScreen"
        screenOptions={{
          headerShown: Platform.OS == 'ios' ? true : false,
        }}>
        {!state?.currentCity ? (
          <Stack.Screen
            name="OnBoardingScreen"
            component={OnBoardingScreen}
            options={{
              headerShown: false,
            }}
          />
        ) : (
          <>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="ForecastScreen" component={ForecastScreen} />
            <Stack.Screen name="CityScreen" component={CityScreen} />
            <Stack.Screen name="CityForecast" component={CityForecast} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
