import { StyleSheet } from "react-native"
import theme from "../../styleguide"

const styles = StyleSheet.create({
    button: {
      backgroundColor: theme.colors.blue,
    },
    buttonDisabled: {
      backgroundColor: theme.colors.transparentLight,
    },
    buttonLoadingColor: {
      color: theme.colors.white,
    },
    icon: {
      tintColor: theme.colors.white,
    },
    title: {
      color: theme.colors.white,
    },
})

export default styles