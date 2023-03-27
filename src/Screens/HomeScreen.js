import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Alert,
  ImageBackground,
  Keyboard,
  Text,
  View,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import bgImg from '../assets/4.png';
import styled from 'styled-components/native';
import CurrentForecast from '../components/CurrentForecast';
import DailyForecast from '../components/DailyForecast';
import {useDispatch, useSelector} from 'react-redux';
import {getWeather} from '../Redux/actions/weatherActions';
import {useNavigation} from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';
import {refreshData} from '../Redux/actions/refreshActions';

function HomeScreen() {

  const [refreshing, setRefreshing] = React.useState(false);

  

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchLatLongHandler();
    setRefreshing(false);
  }, []);

  NetInfo.addEventListener(networkState => {});
  NetInfo.fetch().then(networkState => {});
  const [isOffline, setOfflineStatus] = useState(true);

  useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener(state => {
      const offline = !(state.isConnected && state.isInternetReachable);
      setOfflineStatus(offline);
      // console.log("Is Offline",offline);
    });

    return () => removeNetInfoSubscription();
  }, [isOffline]);

  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const {currentCity, weatherData, cities} = useSelector(
    state => state.weather
  );
  console.log(weatherData)


  const navigation = useNavigation();

  // useEffect(() => {
  //   if (isOffline == false) {
  //     fetchLatLongHandler();
  //   }
  // }, [isOffline]);

  //fetch lat long by city
  const fetchLatLongHandler = () => {
    console.log('Fetching');
    setLoading(true);
    dispatch(
      refreshData(
        currentCity,
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
        <TouchableOpacity
          style={{padding: 10}}
          onPress={() => navigation.navigate('CityScreen')}>
          <Text style={{fontSize: 30, color: 'white'}}>+</Text>
        </TouchableOpacity>
        {loading && weatherData.timezone==null ? (
          <ActivityIndicator />
        ) : (
          <View>
            <FlatList
              data={weatherData && weatherData.daily.slice(1, 4)}
              initialNumToRender={4}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              ListHeaderComponent={
                <CurrentForecast
                  currentWeather={weatherData}
                  timezone={weatherData.timezone}
                />
              }
              key={item => item.day}
              renderItem={({item}) => <DailyForecast day={item} />}
            />
            <DayContainer
              onPress={() => {
                navigation.navigate('ForecastScreen');
              }}>
              <Text style={styles.font}>5-Day Forecast</Text>
            </DayContainer>
          </View>
        )}
      </ImageBackground>
    </Container>
  );
}

const styles = StyleSheet.create({
  font: {
    fontFamily: 'Montserrat-Medium',
  },
});

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
