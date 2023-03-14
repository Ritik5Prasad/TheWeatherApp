import React, {useEffect, useState} from 'react';
import {
  FlatList,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import bgImg from '../assets/4.png';
import styled from 'styled-components/native';
import {useSelector} from 'react-redux';
import FullForecast from '../components/FullForecast';

function ForecastScreen() {
  const {weatherData, currentCity} = useSelector(state => state.weather);

  return (
    <Container>
      <ImageBackground
        source={bgImg}
        style={{width: '100%', height: '100%', flex: 1}}>
        <Text style={styles.footerText}>5 Days Forecast</Text>
        <Text style={styles.footerText}>{currentCity}</Text>
        <FlatList
          data={weatherData.daily.slice(1)}
          horizontal={true}
          key={item => item.day}
          renderItem={({item}) => <FullForecast day={item} />}
        />
      </ImageBackground>
    </Container>
  );
}

const styles = StyleSheet.create({
  footerText: {
    fontSize: 26,
    fontFamily: 'Montserrat-Bold',
    color: 'white',
    textAlign: 'center',
    alignSelf: 'center',
    top: 100,
  },
});
const Container = styled.View`
  flex: 1;
`;
export default ForecastScreen;
