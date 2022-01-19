import React, { useEffect  } from 'react';
import { Alert, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import { NavigationParamList } from '../../navigation'
import * as Location from 'expo-location';
import LottieView from 'lottie-react-native';
import routes from '../../navigation/routes';
import { useLocation } from '../../contexts';
import styles from './styles';

type WelcomeNavigationProp = CompositeNavigationProp<
  StackNavigationProp<NavigationParamList, 'App.Home'>,
  StackNavigationProp<{}>
>

export interface WelcomeProps {
  navigation: WelcomeNavigationProp
}

import locationSrc from '../../assets/animation/location.json';

const Welcome: React.FC<WelcomeProps> = ({
  navigation
}) => {
  const {
    location,
    onUpdateLocation
  } = useLocation()

  const handleOnLocation = async (): Promise<void> => {
    const enabled = await Location.hasServicesEnabledAsync();
    
    const { 
      status 
    } = await Location.requestForegroundPermissionsAsync();

    if (!enabled) {
      Alert.alert(
        'Serviço de localização inativo',
        'Por favor habilite o serviço de localização para continuar',
        [
          { text: 'OK' }
        ],
        { 
          cancelable: false 
        }
      );
    }
  
    if (status !== 'granted') {
      Alert.alert(
        'Permissão não habilitada',
        'Permitir o app usar o serviço de localização',
        [
          { 
            text: 'OK' 
          }
        ],
        { 
          cancelable: false 
        }
      );
    }
  
    let { coords } = await Location.getCurrentPositionAsync();
  
    if (coords) {
      const { latitude, longitude } = coords;
      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude
      });
  
      for (let item of response) {
        await onUpdateLocation({
          latitude,
          longitude,
          name: item.name,
          street: item.street,
          city: item.city,
          country: item.country,
          district: item.district,
          postalCode: item.postalCode,
          region: item.region,
          timezone: item.timezone,
          streetNumber: item.streetNumber
        })
      }

      setTimeout(() => {
        navigation.navigate(routes.App.Weather)
      }, 3000)
    }
  };

  useEffect(() => {
    handleOnLocation();
  }, []);

  return (
    <View style={styles.container}>
      <LottieView
        source={locationSrc}
        autoPlay
        loop
        style={styles.location}
      />
    </View>
  )
}

export default Welcome;