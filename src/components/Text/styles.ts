import { StyleSheet } from "react-native";
import theme from "../../styleguide"

const styles = StyleSheet.create({
    headingTitle: {
        color: theme.colors.black,
        fontFamily: theme.fonts.MontserratMedium,
        fontSize: 24,
        letterSpacing: -0.2,
        lineHeight: 30,
    },
    headline: {
        color: theme.colors.black,
        fontFamily: theme.fonts.MontserratMedium,
        fontSize: 20,
        lineHeight: 24,
    },
    bodyLarge: {
        color: theme.colors.black,
        fontFamily: theme.fonts.MontserratMedium,
        fontSize: 18,
        letterSpacing: -0.05,
        lineHeight: 24,
    },
    bodyMedium: {
        color: theme.colors.black,
        fontFamily: theme.fonts.MontserratMedium,
        fontSize: 16,
        letterSpacing: -0.05,
        lineHeight: 20,
    },
    bodyCaption: {
        color: theme.colors.black,
        fontFamily: theme.fonts.MontserratRegular,
        fontSize: 14,
        letterSpacing: -0.05,
        lineHeight: 18,
    },
    bodyFootnote: {
        color: theme.colors.black,
        fontFamily: theme.fonts.MontserratMedium,
        fontSize: 12,
        letterSpacing: -0.15,
        lineHeight: 16,
    }
})

export default styles