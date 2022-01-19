import React, { useEffect, useState, ReactElement } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlatList, TouchableOpacity, View } from 'react-native';
import LottieView from 'lottie-react-native';
import { Button, Loading } from '../../components';
import Text, { TextSize } from '../../components/Text';
import { useLocation } from '../../contexts'
import API, { AxiosError } from '../../services/api'
import { toCelsius, toPercentage } from '../../helpers/temperature'
import { WeatherColor, WeatherData, WeatherTitle, WeatherType } from '../../model/weather'
import styles from './styles';

enum States {
  default = 'default',
  loading = 'loading',
  networkError = 'networkError',
  genericError = 'genericError',
}

interface List {
  dt: number
  temp: {
    day: number
    min: number
    max: number
  }
  humidity: number
  weather: WeatherData[]
}

interface Response {
  list: List[]
}

import sunnySrc from '../../assets/animation/sunny.json';
import rainSrc from '../../assets/animation/rain.json';
import cloudsSrc from '../../assets/animation/clouds.json';
import clearSrc from '../../assets/animation/clear.json';
import snowSrc from '../../assets/animation/snow.json';

const Weather: React.FC = () => {
  const [states, setStates] = useState<States>(States.default);
  const [weather, setWeather] = useState<List>({} as List);
  const [listData, setListData] = useState<List[]>([]);
  const [type, setType] = useState(WeatherType.Rain);
  const {
    location
  } = useLocation()

  const handleOnFetch = async (): Promise<void> => {
    try {
      setStates(States.loading)
      
      const { data } = await API.get<Response>(
        `/data/2.5/forecast/daily?lat=${location.latitude}&lon=${location.longitude}&&units=metric&cnt=16&appid=498e3a7f8df503cc42c93440626e8ae5`
        )
        
        const [firstItem, ...rest] = data.list
        
        setWeather(firstItem)
        setListData(data.list)
        
        setStates(States.default)
    } catch(error) {
      const err = error as AxiosError

      if (!err?.response) {
        setStates(States.networkError)
        return
      }

      setStates(States.genericError)
    }
  }
  
  const handleOnPressWeather = (newWeather: List): void => {
    setType(WeatherType[newWeather.weather[0].main as WeatherType])
    setWeather(newWeather)
  }

  useEffect(() => {
    handleOnFetch()
  }, [])

  const handleOnRefetch = (): void => {
    handleOnFetch()
  }

  const renderLoading: ReactElement = <Loading />

  const renderContent: ReactElement = (
    <SafeAreaView edges={['bottom']} style={[styles.container, {
      backgroundColor: WeatherColor[type]
    }]}>
      <View style={styles.flex1}>
        <Text size={TextSize.bodyMedium} style={[styles.white, styles.address, styles.textCenter]}>
          {`${location.name}, ${location.street}, ${location.postalCode}, ${location.city}`}
        </Text>
        <LottieView
          source={{
            [WeatherType.Clear]: clearSrc,
            [WeatherType.Clouds]: cloudsSrc,
            [WeatherType.Sunny]: sunnySrc,
            [WeatherType.Rain]: rainSrc,
            [WeatherType.Snow]: snowSrc,
          }[type] || sunnySrc}
          autoPlay
          loop
          style={styles.weatherIcon}
        />
        <Text size={TextSize.bodyMedium} style={[styles.white, styles.title, styles.textCenter]}>
          {WeatherTitle[type]}
        </Text>
        <Text size={TextSize.headline} style={[styles.white, styles.temp, styles.textCenter]}>
          {toCelsius(weather?.temp?.day ?? 0, 0)}{'°'}
        </Text>
        <View style={styles.wrapperMinOrMax}>
          <Text size={TextSize.bodyMedium} style={styles.white}>
            Min: {toCelsius(weather?.temp?.min ?? 0 , 0)}{'°'}
          </Text>
          <Text size={TextSize.bodyMedium} style={styles.white}>
            Max: {toCelsius(weather?.temp?.max ?? 0, 0)}{'°'}
          </Text>
          <Text size={TextSize.bodyMedium} style={styles.white}>
            Umidade: {toPercentage(weather.humidity)}{'%'}
          </Text>
        </View>
      </View>
      
      <View style={styles.wrapperWeather}>
        <FlatList 
          contentContainerStyle={styles.scrollInner}
          data={listData}
          horizontal
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.dt.toString()}
          renderItem={({item}) => (
            <TouchableOpacity 
              key={item.dt} 
              onPress={(): void => handleOnPressWeather(item)}
              style={styles.weatherItem}>
              <LottieView
                source={{
                  [WeatherType.Clear]: clearSrc,
                  [WeatherType.Clouds]: cloudsSrc,
                  [WeatherType.Sunny]: sunnySrc,
                  [WeatherType.Rain]: rainSrc,
                  [WeatherType.Snow]: snowSrc,
                }[item.weather[0].main] || sunnySrc}
                autoPlay
                loop
                style={styles.weatherIconByDay}
              />
              <Text size={TextSize.bodyCaption} style={styles.white}>
                {toCelsius(item.temp.day, 0)}{'°'}
              </Text>
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={(): ReactElement => <View style={styles.separator} />}
          ListFooterComponent={(): ReactElement => <View style={styles.footer} />}
          style={styles.wrapperWeatherByDays}
        />
      </View>

      <Button 
        title='Atualizar'
        onPress={handleOnRefetch}
        size='large'
        type='secondary'
        borderRadius
        buttonStyle={styles.button}
      />
    </SafeAreaView>
  )

  const renderGenericError: ReactElement = (
    <View style={[styles.flex1, styles.container]}>
      <View style={styles.flex1}>
        <Text style={[styles.white, styles.textCenter]}>
          Ocorreu um pequeno problema tente novamente, por favor!
        </Text>

        <Button 
          title='Tentar novamente'
          onPress={handleOnRefetch}
          size='large'
          type='secondary'
          borderRadius
          buttonStyle={styles.button}
        />
      </View>
    </View>
  )

  const renderNetworkError: ReactElement = (
    <View style={[styles.flex1, styles.container]}>
      <View style={styles.flex1}>
        <Text style={[styles.white, styles.textCenter]}>
          Ah que pensa algo de errado ocorreu com sua conexão a internet
        </Text>
      </View>

      <Button 
        title='Tentar novamente'
        onPress={handleOnRefetch}
        size='large'
        type='secondary'
        borderRadius
        buttonStyle={styles.button}
      />
    </View>
  )

  return (
    <React.Fragment>
      {
        {
          [States.loading]: renderLoading,
          [States.default]: renderContent,
          [States.genericError]: renderGenericError,
          [States.networkError]: renderNetworkError
        }[states]
      }
    </React.Fragment>
  );
}

export default Weather;