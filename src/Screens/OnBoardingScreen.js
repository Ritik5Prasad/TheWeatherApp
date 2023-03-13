import React, {useState} from 'react';
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
  KeyboardAvoidingView
} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import {getWeather} from '../Redux/actions/weatherActions';
import {useDispatch} from 'react-redux';
import logo from '../assets/edit.png'
import Video from 'react-native-video';
import bgImage from '../assets/4.png'

const {width, height} = Dimensions.get('window');

function OnBoardingScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const fetchLatLongHandler = async () => {
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
    navigation.navigate('Home');
  };

  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  return (
    <View>
      <StatusBar hidden />
    <ImageBackground source={bgImage} style={{width: '100%', height: '100%'}}>
    <KeyboardAvoidingView >

      <ScrollView>

        <View style={{alignItems:'center',borderRadius:200,height:320,width:400}}>
          <Image source={logo} style={{width:'100%',height:400,tintColor:'white',}}  />
        </View>
        <Text style={styles.footerText}>
          Get 7 Days Forecast Weather Report
        </Text>
        <Text style={[styles.footerText,{marginBottom:80}]}>
         
        </Text>
        <Wrapper>
          <TextInput value={city} onChangeText={setCity} style={styles.input} placeholder="Enter your city name" placeholderTextColor='#edebe8' />
          <TouchableOpacity onPress={fetchLatLongHandler} style={styles.btn}>
            <Text style={styles.btnColor}>Get Report</Text>
          </TouchableOpacity>
        </Wrapper>
      
      </ScrollView>
      </KeyboardAvoidingView> 
      </ImageBackground>
      {/* <Text style={styles.footerText}>® Made By - Ritik</Text> */}
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
    fontSize:18,
    fontFamily:'Montserrat-Bold'
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
    fontFamily:'Montserrat-Bold',
    color: 'white',
    textAlign: 'center',
    alignSelf: 'center',
  },
  btnColor: {
    color: 'white',
    fontFamily:'Montserrat-Bold'
  },
});

const Wrapper = styled.View`
  justify-content: space-between;
  padding: 20px;
  align-items: center;
  flex-direction: column;
`;

export default OnBoardingScreen;
