import React, {useEffect, useState} from 'react';
import {
  Alert,
  ImageBackground,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
  ScrollView,
  Image,
  StatusBar,
  KeyboardAvoidingView,
} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import {getWeather} from '../Redux/actions/weatherActions';
import {useDispatch, useSelector} from 'react-redux';
import logo from '../assets/edit.png';
import Video from 'react-native-video';
import bgImage from '../assets/4.png';
import NetInfo from '@react-native-community/netinfo';
import Geolocation from '@react-native-community/geolocation';
const {width, height} = Dimensions.get('screen');

function OnBoardingScreen() {
  const [permissionAllowed, setPermissionAllowed] = React.useState(true);
  const [longitude, setLongitude] = React.useState('');
  const [latitude, setLatiitude] = React.useState('');
  const s=useSelector(state => state)
  console.log(s)

  Geolocation.setRNConfiguration({
    config: {
      skipPermissionRequests: permissionAllowed,
      authorizationLevel: 'always' | 'whenInUse' | 'auto',
      locationProvider: 'playServices' | 'android' | 'auto',
    },
  });
  

  NetInfo.addEventListener(networkState => {});
  NetInfo.fetch().then(networkState => {});
  const [isOffline, setOfflineStatus] = useState(true);

  useEffect(() => {
    fetchLatLongHandler()
  }, []);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const fetchLatLongHandler = async () => {
    // if (city === '') {
    //   return Alert.alert('Validation', 'City name is required!', [
    //     {text: 'OK'},
    //   ]);
    // }

    setLoading(true);
    await Geolocation.getCurrentPosition(async info => {
      await dispatch(
        getWeather(
          city,
          info.coords.longitude,
          info.coords.latitude,
          () => {
           
          },
          () => setLoading(false),
        ),
      );
    });
      
  
    setCity('');
    Keyboard.dismiss();
    navigation.reset({
      index: 0,
      routes: [{name: 'Home'}],
    });
    
  };

  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  return (
    <View>
      <StatusBar hidden />
      <Video
        source={require('../assets/v.mp4')}
        style={styles.backgroundVideo}
        muted={true}
        repeat={true}
        resizeMode={'cover'}
        rate={1.0}
        ignoreSilentSwitch={'obey'}
      />
      <KeyboardAvoidingView>
        <ScrollView>
          <View
            style={{
              alignItems: 'center',
              borderRadius: 200,
              height: 320,
              width: 400,
            }}>
            <Image
              source={logo}
              style={{width: '100%', height: 400, tintColor: 'white'}}
            />
          </View>
          <Text style={styles.footerText}>
            Get 5 Days Forecast Weather Report 
            
          </Text>

          <Wrapper>
            <TextInput
              value={city}
              onChangeText={setCity}
              style={styles.input}
              placeholder="Enter your city name"
              placeholderTextColor="#edebe8"
            />
            <TouchableOpacity onPress={fetchLatLongHandler} style={styles.btn}>
              <Text style={styles.btnColor}>Get Report</Text>

            </TouchableOpacity>
          </Wrapper>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'transparent',
    width: '85%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'white',
    color: 'white',
    padding: 10,
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundVideo: {
    height: height,
    position: 'absolute',
    top: 0,
    left: 0,
    alignItems: 'stretch',
    opacity: 0.7,
    bottom: 0,
    right: 0,
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  btn: {
    backgroundColor: 'transparent',
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    padding: 10,
    margin: 20,
    borderColor: 'white',
    borderWidth: 1,
  },
  footerText: {
    fontSize: 26,
    fontFamily: 'Montserrat-Bold',
    color: 'white',
    textAlign: 'center',
    alignSelf: 'center',
  },
  btnColor: {
    color: 'white',
    fontFamily: 'Montserrat-Bold',
  },
});

const Wrapper = styled.View`
  justify-content: space-between;
  padding: 20px;
  align-items: center;
  flex-direction: column;
  margin-top: 12px;
`;

export default OnBoardingScreen;
