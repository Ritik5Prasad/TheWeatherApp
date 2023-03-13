import React, { useState } from 'react';
import {
  NavigationContainer,
} from '@react-navigation/native';
import 'react-native-gesture-handler';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../Screens/HomeScreen';
import ForecastScreen from '../Screens/ForecastScreen';
import OnBoardingScreen from '../Screens/OnBoardingScreen';
import { useSelector } from 'react-redux';
import { ActivityIndicator } from 'react-native';



const Stack = createNativeStackNavigator();

const Navigation = () => {
  const [initialRouteName,setInitialRouteName]=useState("");
  const {currentCity}=useSelector(state=>state.weather)
 
  React.useEffect(() => {
   
  
    setTimeout(onBoarderd, 1000);
  }, []);
 
  const onBoarderd=async()=>{
    if(currentCity==""){
      setInitialRouteName("OnBoardingScreen")
    }
    else{
      setInitialRouteName("Home")
    }
  }
  return (
    <NavigationContainer>
      {initialRouteName == '' ? (
            <ActivityIndicator />
          ) : (
            <>
      <Stack.Navigator
        initialRouteName={initialRouteName}
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="OnBoardingScreen" component={OnBoardingScreen} />
        <Stack.Screen name="ForecastScreen" component={ForecastScreen} />
      </Stack.Navigator>
      </>
          )}
    </NavigationContainer>
  );
};

export default Navigation;
