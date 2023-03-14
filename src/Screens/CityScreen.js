import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Alert,
  FlatList,
  ImageBackground,
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components/native';
import bgImg from '../assets/4.png';
import ForecastSearch from '../components/ForecastSearch';
import {removeCity} from '../Redux/actions/removeCityActions';
import {openweathermap_api_key} from '../../config.json';
import {addCity} from '../Redux/actions/addCityActions';

function CityScreen() {
  const [city, setCity] = useState('');
  const [toggleSearch, setToggleSearch] = useState('city');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const {cities} = useSelector(state => state.weather);

  const navigation = useNavigation();

  //fetch lat long by city
  const fetchLatLongHandler = async () => {
    if (city === '') {
      return Alert.alert('Validation', 'City name is required!', [
        {text: 'OK'},
      ]);
    }

    try {
      let lat = '';
      let long = '';
      const latlong = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${openweathermap_api_key}`,
      );

      const resData = await latlong.json();

      lat = resData[0].lat;
      long = resData[0].lon;

      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=hourly,minutely&units=metric&appid=${openweathermap_api_key}`,
      );
      const weatherData = await weatherResponse.json();
      navigation.navigate('CityForecast', {
        weatherData: weatherData,
        currentCity: city,
      });

      dispatch(
        addCity(
          {
            cityName: city,
            lat: resData[0].lat,
            long: resData[0].lon,
            weatherData: weatherData,
          },
          () => setLoading(false),
          () => setLoading(false),
        ),
      );
    } catch (err) {
      console.log(err);
      alert(err);
    }
    setCity('');
    Keyboard.dismiss();
  };

  const renderCitiesList = ({item}) => {
    if (!item) return null;

    return (
      <DayContainer>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('CityForecast', {
              weatherData: item.weatherData,
              currentCity: item.cityName,
            });
          }}>
          <Text style={styles.font}>{item.cityName}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            dispatch(
              removeCity(
                item,
                () => setLoading(false),
                () => setLoading(false),
              ),
            );
          }}>
          <Text
            style={{
              fontSize: 16,
              color: 'red',
            }}>
            X
          </Text>
        </TouchableOpacity>
      </DayContainer>
    );
  };

  return (
    <Container>
      <ImageBackground source={bgImg} style={{width: '100%', height: '100%'}}>
        <ForecastSearch
          city={city}
          setCity={setCity}
          fetchLatLongHandler={fetchLatLongHandler}
          toggleSearch={toggleSearch}
          setToggleSearch={setToggleSearch}
        />

        <FlatList
          data={cities}
          key={item => item.id}
          renderItem={renderCitiesList}
        />
      </ImageBackground>
    </Container>
  );
}

const styles = StyleSheet.create({
  font: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 18,
  },
});
const Container = styled.View`
  flex: 1;
`;
const DayContainer = styled.View`
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  margin: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 95%;
  max-width: 478px;
`;
export default CityScreen;
