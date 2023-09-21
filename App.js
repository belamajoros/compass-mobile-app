import { Image, View, Text, StyleSheet, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Magnetometer } from 'expo-sensors';

Magnetometer.setUpdateInterval(130);

export default App = () => {

  const [subscription, setSubscription] = useState(null);
  const [magnetometer, setMagnetometer] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    _toggle();
    return () => {
      _unsubscribe();
    };
  }, []);

  const _toggle = () => {
    if (subscription) {
      _unsubscribe();
    } else {
      _subscribe();
    }
  };

  const _subscribe = () => {
    setSubscription(
      Magnetometer.addListener((data) => {
        setMagnetometer(_angle(data));
      })
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    subscription = null;
  };

  const _angle = (magnetometer) => {
    if (magnetometer) {
      let { x, y, z } = magnetometer;

      if (Math.atan2(y, x) >= 0) {
        angle = Math.atan2(y, x) * (180 / Math.PI);
      }
      else {
        angle = (Math.atan2(y, x) + 2 * Math.PI) * (180 / Math.PI);
      }
    }

    return Math.round(angle);
  };

  const _direction = (degree) => {
    if (degree >= 22.5 && degree < 67.5) {
      return 'North East';
    }
    else if (degree >= 67.5 && degree < 112.5) {
      return 'East';
    }
    else if (degree >= 112.5 && degree < 157.5) {
      return 'South East';
    }
    else if (degree >= 157.5 && degree < 202.5) {
      return 'South';
    }
    else if (degree >= 202.5 && degree < 247.5) {
      return 'South West';
    }
    else if (degree >= 247.5 && degree < 292.5) {
      return 'West';
    }
    else if (degree >= 292.5 && degree < 337.5) {
      return 'North West';
    }
    else {
      return 'North';
    }
  };

  const _degree = (magnetometer) => {
    return magnetometer - 90 >= 0 ? magnetometer - 90 : magnetometer + 271;
  };

  return (
    <View style={styles.container}>
      {
        show ? <Text style={styles.text}>{_degree(magnetometer)}° {_direction(_degree(magnetometer))}</Text> : null
      }
      <Image style={{
        width: 320,
        height: 320,
        transform: [{ rotate: 90 - magnetometer + 'deg' }],
      }} source={require('./assets/compass.png')} />
      <Button title={show ? 'Hide angle' : 'Show angle'} onPress={() => setShow(!show)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  text: {
    paddingBottom: 40,
    fontSize: 25,
    fontWeight: 'bold',
  },
});











