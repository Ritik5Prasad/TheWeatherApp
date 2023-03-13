import React, {useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Alert,
  ImageBackground,
  Keyboard,
  Text,
  View,
} from 'react-native';
import bgImg from '../assets/4.png';
import styled from 'styled-components/native';
import ForecastSearch from '../components/ForecastSearch';
import CurrentForecast from '../components/CurrentForecast';
import DailyForecast from '../components/DailyForecast';
import {useDispatch, useSelector} from 'react-redux';
import {getWeather} from '../Redux/actions/weatherActions';
import {useNavigation} from '@react-navigation/native';

function HomeScreen() {
  const [toggleSearch, setToggleSearch] = useState('city');
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const {currentCity, weatherData} = useSelector(state => state.weather);
  const navigation = useNavigation();
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
    setCity('');
    Keyboard.dismiss();
  };

  return (
    <Container>
      <ImageBackground source={bgImg} style={{width: '100%', height: '100%'}}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <View>
            <ForecastSearch
              city={city}
              setCity={setCity}
              fetchLatLongHandler={fetchLatLongHandler}
              toggleSearch={toggleSearch}
              setToggleSearch={setToggleSearch}
            />

            <CurrentForecast
              currentWeather={weatherData}
              timezone={weatherData.timezone}
            />

            <FlatList
              data={weatherData.daily.slice(0, 2)}
              initialNumToRender={4}
              key={item => item.day}
              renderItem={({item}) => <DailyForecast day={item} />}
            />
            <DayContainer
              onPress={() => {
                navigation.navigate('ForecastScreen');
              }}>
              <Text>View Full Forecast</Text>
            </DayContainer>
          </View>
        )}
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
const DayContainer = styled.TouchableOpacity`
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 10px;
  margin: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  width: 95%;
  max-width: 478px;
`;
export default HomeScreen;
