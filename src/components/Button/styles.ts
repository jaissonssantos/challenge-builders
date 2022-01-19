import { StyleSheet } from "react-native"
import theme from "../../styleguide"

const styles = StyleSheet.create({
    button: {
      alignItems: "center",
      backgroundColor: theme.colors.purple,
      flexDirection: "row",
      justifyContent: "center",
      paddingHorizontal: 20,
    },

    buttonDisabled: {
      backgroundColor: theme.colors.transparentLight,
    },

    buttonLoadingColor: {
      color: theme.colors.white,
    },

    buttonTitleDisabled: {
      color: theme.colors.white,
    },

    buttonWithBorderRadiusLarge: {
      borderRadius: 5,
    },

    buttonWithBorderRadiusMedium: {
      borderRadius: 5,
    },

    buttonWithBorderRadiusSmall: {
      borderRadius: 5,
    },

    buttonWithIcon: {
      justifyContent: "space-between",
    },

    icon: {
      height: 24,
      resizeMode: "contain",
      width: 24,
    },

    sizeLarge: {
      height: 56,
    },

    sizeMedium: {
      height: 48,
    },

    sizeSmall: {
      height: 40,
    },

    sizeXSmall: {
      height: 20,
    },

    title: {
      color: theme.colors.white
    },
})

export default styles