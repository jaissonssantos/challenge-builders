import { StyleSheet } from 'react-native';
import theme from '../../styleguide';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.purple
    },
    flex1: {
      flex: 1,
      justifyContent: 'center',
    },
    wrapperWeather: {
      flex: .2,
    },
    scrollInner: {
      flexGrow: 1,
    },
    white: {
      color: theme.colors.white,
    },
    textCenter: {
      textAlign: 'center'
    },
    address: {
      marginBottom: 20,
      marginHorizontal: 20
    },
    title: {
      marginTop: 14,
      textTransform: 'uppercase'
    },
    temp: {
      fontSize: 130,
      lineHeight: 140
    },
    wrapperMinOrMax: {
      flexDirection: 'row',
      justifyContent: 'space-evenly'
    },
    weatherIconByDay: {
      backgroundColor: 'transparent',
      width: 48,
      height: 48,
      alignSelf: 'center'
    },
    weatherIcon: {
      backgroundColor: 'transparent',
      width: 160,
      height: 160,
      alignSelf: 'center'
    },
    weatherItem: {
      borderColor: theme.colors.white,
      borderWidth: 2,
      borderRadius: 5,
      height: 94,
      width: 94,
      alignItems: 'center',
      justifyContent: 'center',
    },
    wrapperWeatherByDays: {
      paddingLeft: 20,
      paddingRight: 20,
    },
    separator: {
      margin: 5,
    },
    footer: {
      width: 40
    },
    button: {
      margin: 20
    }
});

export default styles