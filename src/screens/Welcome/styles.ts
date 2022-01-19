import { StyleSheet } from 'react-native'
import theme from '../../styleguide'

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.purple,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20
    },
    textWhite: {
      color: theme.colors.white,
      fontSize: 12,
      fontFamily: theme.fonts.MontserratRegular
    },
    location: {
      backgroundColor: 'transparent',
      width: 190,
      height: 190,
    },
});

export default styles