import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Alert, ImageBackground, Keyboard, ScrollView, Text, View} from 'react-native';
import {openweathermap_api_key} from '../../config.json';
import bgImg from '../assets/4.png';
import styled from 'styled-components/native';
import ForecastSearch from '../components/ForecastSearch';
import CurrentForecast from '../components/CurrentForecast';
import DailyForecast from '../components/DailyForecast';
import {useDispatch, useSelector} from 'react-redux';
import {getWeather} from '../Redux/actions/weatherActions';

function HomeScreen() {
  const [toggleSearch, setToggleSearch] = useState('city');
  const [city, setCity] = useState('');

  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const {currentCity,weatherData} = useSelector(state => state.weather);
  const s=useSelector(state=>state)
  console.log(s)
  
  //fetch lat long by city
  const fetchLatLongHandler = () => {
    if (city === '') {
      return Alert.alert('Validation', 'City name is required!', [
        {text: 'OK'},
      ]);
    }

    setLoading(true);
    dispatch(
      getWeather(
        city,
        () => setLoading(false),
        () => setLoading(false),
      ),
    );
    setSearch('');
    Keyboard.dismiss();
  };


  return (
    <Container>
      <ImageBackground source={bgImg} style={{width: '100%', height: '100%'}}>
       {loading ? 
       <ActivityIndicator /> :
        <ScrollView>
          <ForecastSearch
            city={city}
            setCity={setCity}
            fetchLatLongHandler={fetchLatLongHandler}
            toggleSearch={toggleSearch}
            setToggleSearch={setToggleSearch}
          
          />
          <Text>{currentCity}</Text>

          <CurrentForecast
            currentWeather={weatherData}
            timezone={weatherData.timezone}
            
          />

          <ScrollView style={{flex: 1}}>
            <FutureForecastContainer>

            

              {weatherData.daily ? (
                weatherData.daily.map((day, index) => {
                  if (index !== 0) {
                    return (
                      <DailyForecast key={day.dt} day={day} index={index} />
                    );
                  }
                })
              ) : (
                <NoWeather>No Weather to show</NoWeather>
              )}
            </FutureForecastContainer>
          </ScrollView>
        </ScrollView>
        }
      </ImageBackground>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
`;

const NoWeather = styled.Text`
  text-align: center;
  color: white;
`;

const FutureForecastContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
`;
export default HomeScreen;
