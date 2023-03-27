import React, {useEffect, useState} from 'react';
import {Provider} from 'react-redux';
import {store, persistor} from './src/Redux';
import Navigation from './src/Navigation/Navigation';
import {PersistGate} from 'redux-persist/integration/react';
import NetInfo from '@react-native-community/netinfo';
import LottieView from 'lottie-react-native';
import {BlurView} from '@react-native-community/blur';
import {StyleSheet, SafeAreaView, View, Text, Dimensions} from 'react-native';

function App() {
  NetInfo.addEventListener(networkState => {});
  NetInfo.fetch().then(networkState => {});
  const [isOffline, setOfflineStatus] = useState(false);

  useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener(state => {
      const offline = !(state.isConnected && state.isInternetReachable);
      setOfflineStatus(offline);
      // console.log("Is Offline",offline);
    });

    return () => removeNetInfoSubscription();
  }, [isOffline]);

  return (
    <Provider store={store}>
      {isOffline ? (
        <SafeAreaView style={styles.noInternetContainer}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
            }}>
            <BlurView
              style={styles.absolute}
              blurType="light"
              blurAmount={100}
            />
            <Text
              style={[
                styles.noInternetText,
                {color: 'red', fontWeight: 'bold'},
              ]}>
              IT SEEMS NO INTERNET CONNECTION
            </Text>

            <View style={{height: 60, width: 60}}>
              <LottieView
                source={require(`./src/assets/netEye.json`)}
                autoPlay={true}
                speed={0.6}
                loop={true}
              />
            </View>
          </View>
        </SafeAreaView>
      ) : null}

      <PersistGate loading={null} persistor={persistor}>
        <Navigation />
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  noInternetContainer: {
    position: 'absolute',
    zIndex: 10,
    elevation: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,

    height: 60,
  },
  noInternetText: {
    fontSize: 14,
    textShadowColor: 'white',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
export default App;
