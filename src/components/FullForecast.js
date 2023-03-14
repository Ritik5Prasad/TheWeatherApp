import React from 'react';
import {Text, View} from 'react-native';
import styled from 'styled-components/native';
import moment from 'moment';

const FullForecast = ({day, index}) => {
  return (
    <DayContainer>
      <DateContainer>
        <WeekDay>{moment(day.dt * 1000).format('ddd')}</WeekDay>
        <WeekDay>
          {JSON.stringify(moment(day.dt * 1000).toDate()).slice(6, 11)}
        </WeekDay>
      </DateContainer>
      <SecondaryInfoContainer>
        <Row>
          <DetailsBox>
            <Label>Feels</Label>
            <Details>
              {day.current && Math.round(day.current.feels_like)}
              °C
            </Details>
          </DetailsBox>
          <DetailsBox>
            <Label>Low</Label>
            <Details>
              {day && Math.round(day.temp.min)}
              °C
            </Details>
          </DetailsBox>
          <DetailsBox>
            <Label>High</Label>
            <Details>
              {day && Math.round(day.temp.max)}
              °C
            </Details>
          </DetailsBox>
        </Row>
        <Row>
          <DetailsBox>
            <Label>Wind</Label>
            <Details>{day && day.wind_speed} m/s</Details>
          </DetailsBox>
          <DetailsBox>
            <Label>Humidity</Label>
            <Details>{day && day.humidity}%</Details>
          </DetailsBox>
          <DetailsBox>
            <Label>Rain</Label>
            <Details>{day > 0 ? day.rain : '0'} MM</Details>
          </DetailsBox>
        </Row>
      </SecondaryInfoContainer>

      <IconTempView>
        <WeatherIcon
          source={{
            uri: `http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`,
          }}
          resizeMode={'contain'}
        />
        <Text>{day.weather[0].description}</Text>
      </IconTempView>
      <DegreeView>
        <Degree>{Math.round(day.temp.max)}°C</Degree>
      </DegreeView>
    </DayContainer>
  );
};

const DayContainer = styled.View`
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 10px;
  align-items: center;
  height: 400px;
  align-self: center;
  margin: 20px;
  flex: 1;
  width: 85%;
`;

const DateContainer = styled.View`
  text-align: right;
`;

const WeekDay = styled.Text`
  font-size: 24px;
  text-align: center;
  margin: 3px;
`;
const CurrentView = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding-top: 0px;
`;

const CurrentTempView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const MainInfoContainer = styled.View`
  display: flex;
  align-items: center;
`;

const Description = styled.Text`
  color: white;
  font-size: 15px;
  text-transform: capitalize;
`;

const SecondaryInfoContainer = styled.View`
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 10px;
  width: 300px;
`;

const WeatherIcon = styled.Image`
  width: 50px;
  height: 50px;
`;

const Timezone = styled.Text`
  color: white;
  display: flex;
  justify-content: center;
  margin-top: 10px;
  font-size: 23px;
  font-family: 'Montserrat-SemiBold';
`;

const CurrentDegrees = styled.Text`
  color: white;
  display: flex;
  justify-content: center;
  margin-top: 10px;
  font-size: 60px;
`;

const Row = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  color: black;
  padding: 10px 30px;
`;

const DetailsBox = styled.View`
  display: flex;
`;

const Label = styled.Text`
  font-size: 18px;
`;

const Details = styled.Text`
  color: black;
  font-size: 15px;
  text-transform: capitalize;
  align-items: center;
  text-align: center;
`;

const IconTempView = styled.View`
  text-align: center;
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: left;
`;

const DegreeView = styled.View`
  text-align: center;
  flex: 1;
`;

const Degree = styled.Text`
  font-size: 24px;
`;

const FeelsLike = styled.Text`
  font-size: 14px;
`;

export default FullForecast;
