import React, { useEffect,useState } from 'react'
import { ImageBackground, ScrollView, View } from 'react-native'
import {openweathermap_api_key} from '../../config.json' 
import bgImg from '../assets/4.png'
import styled from "styled-components/native";
import ForecastSearch from '../components/ForecastSearch';
import CurrentForecast from '../components/CurrentForecast';
import DailyForecast from '../components/DailyForecast';

 function HomeScreen() {

  const [toggleSearch, setToggleSearch] = useState("city");
  const [city, setCity] = useState("Toronto");
  const [postalCode, setPostalCode] = useState("L4W1S9");
  const [lat, setLat] = useState(43.6532);
  const [long, setLong] = useState(-79.3832);
  const [weather, setWeather] = useState({});

  const controller = new AbortController();
  const signal = controller.signal;


 useEffect(()=>{
  fethLatLong()
 },[])
  const fethLatLong=async()=>{
  try {
    const res=await  fetch(`http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=${openweathermap_api_key}`)
    if (!res.ok) {
      const resData = await res.json();
      throw new Error(resData.message);
    }
   
    const resData = await res.json();
    console.log(resData[0].lat) 
    console.log(resData[0].lon)

    const res2=await  fetch()
    const resRe = await res2.json();
    console.log(resRe)
  } catch (error) {
    console.log(error)
  }
 
} 

 //fetch lat long by city
 const fetchLatLongHandler = () => {
  fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${openweathermap_api_key}`
  )
    .then((res) => res.json())
    .then((data) => {
      setLat(data[0].lat);
      setLong(data[0].lon);
    });
};

  //updates the weather when lat long changes
  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=hourly,minutely&units=metric&appid=${openweathermap_api_key}`,
      { signal }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setWeather(data);
      })
      .catch((err) => {
        console.log("error", err);
      });
    return () => controller.abort();
  }, [lat, long]);


return (
  <Container>
  <ImageBackground source={bgImg} style={{ width: "100%", height: "100%" }}>
   <ScrollView>
    <ForecastSearch
      city={city}
      setCity={setCity}
      fetchLatLongHandler={fetchLatLongHandler}
      toggleSearch={toggleSearch}
      setToggleSearch={setToggleSearch}
     
      setPostalCode={setPostalCode}
      postalCode={postalCode}
    />

    <CurrentForecast currentWeather={weather} timezone={weather.timezone}  />
   
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ flex: 1 }}>
      <FutureForecastContainer>
        {weather.daily ? (
          weather.daily.map((day, index) => {
            if (index !== 0) {
              return <DailyForecast key={day.dt} day={day} index={index} />;
            }
          })
        ) : (
          <NoWeather>No Weather to show</NoWeather>
        )}
      </FutureForecastContainer>
    </ScrollView>
    </ScrollView>
  </ImageBackground>
</Container>

   )
 }
 

 const Container = styled.View`
  flex: 1;
  background-color: dodgerblue;
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
 export default HomeScreen
 