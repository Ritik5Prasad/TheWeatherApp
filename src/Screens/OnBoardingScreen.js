import React, { useState } from 'react'
import { Alert, ImageBackground, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import bgImg from '../assets/4.png';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { getWeather } from '../Redux/actions/weatherActions';
import { useDispatch } from 'react-redux';

function OnBoardingScreen() {
    const navigation=useNavigation()
    const dispatch = useDispatch();

    const fetchLatLongHandler = async() => {
        if (city === '') {
          return Alert.alert('Validation', 'City name is required!', [
            {text: 'OK'},
          ]);
        }
    
        setLoading(true);
        await dispatch(
          getWeather(
            city,
            () => setLoading(false),
            () => setLoading(false),
          ),
        );
        setCity('');
        Keyboard.dismiss();
        navigation.navigate("Home")
      };

      const [city, setCity] = useState('');
      const [loading, setLoading] = useState(false);
  return (
    <View>
      <ImageBackground source={bgImg} style={{width: '100%', height: '100%'}} >
        <Text>Enter Your City Name</Text>
        <TextInput
        value={city}
        onChangeText={setCity}
        style={styles.input}
        />
        <TouchableOpacity onPress={fetchLatLongHandler}>
            <Text>
                Submit
            </Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  )
}



const styles=StyleSheet.create({

  input:{
    backgroundColor:'white'
  }
})

export default OnBoardingScreen
