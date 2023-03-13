import React, {useEffect, useState} from 'react';
import {FlatList, ImageBackground, ScrollView, Text, View} from 'react-native';
import bgImg from '../assets/4.png';
import styled from 'styled-components/native';
import {useSelector} from 'react-redux';
import DailyForecast from '../components/DailyForecast';

function ForecastScreen() {
  const {weatherData} = useSelector(state => state.weather);

  return (
    <Container>
      <ImageBackground source={bgImg} style={{width: '100%', height: '100%'}}>
        
        <FlatList
          data={weatherData.daily}
          initialNumToRender={4}
          key={item => item.day}
          renderItem={({item}) => <DailyForecast day={item} />}
        />
      </ImageBackground>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
`;
export default ForecastScreen;
