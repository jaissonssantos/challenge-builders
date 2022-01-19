import React, { ReactElement, ReactNode } from "react"
import { TouchableOpacity, View, TouchableOpacityProps, ViewStyle, TextStyle, Insets, ActivityIndicator } from "react-native"
import Text, { TextSize } from "../Text"
import styles from "./styles"
import stylesPrimary from "./stylesPrimary"
import stylesSecondary from "./stylesSecondary"
import stylesText from "./stylesText"

export type StylesByType = "primary" | "secondary"  | "text"

export type Size = "large" | "medium" | "small" | "xsmall"

export type IconPosition = "left" | "right" | "top" | "bottom"

export enum FlexDirectionFromIconPosition {
  left = "row-reverse",
  right = "row",
  top = "column-reverse",
  bottom = "column",
}

export interface RenderIconProps {
  icon: ReactNode | (() => ReactNode)
  loadingIcon: boolean
  renderIconStyle: ViewStyle | Array<ViewStyle>
}

export interface ButtonProps extends TouchableOpacityProps {
  disabled?: boolean
  borderRadius?: boolean
  size?: Size
  loading?: boolean
  buttonStyle?: ViewStyle
  hitSlopSize?: Insets
  iconRender?: () => ReactNode
  iconStyle?: ViewStyle
  iconPosition?: IconPosition
  iconSpace?: number
  type: StylesByType 
  title: string
  titleStyle?: TextStyle
  onPress: () => void
}

const Button: React.FC<ButtonProps> = ({
  title,
  titleStyle,
  type,
  disabled,
  size = "medium",
  borderRadius,
  loading,
  iconRender: passedRenderIcon,
  iconStyle,
  iconPosition,
  iconSpace,
  buttonStyle,
  hitSlopSize,
  onPress,
}: ButtonProps) => {
  const stylesByType = {
    primary: stylesPrimary,
    secondary: stylesSecondary,
    text: stylesText,
  }

  const stylesBySize = {
    large: "sizeLarge",
    medium: "sizeMedium",
    small: "sizeSmall",
    xsmall: "sizeXSmall",
  }

  const stylesByBorderSize = {
    large: "buttonWithBorderRadiusLarge",
    medium: "buttonWithBorderRadiusMedium",
    small: "buttonWithBorderRadiusSmall",
    xsmall: "buttonWithBorderRadiusSmall",
  }

  const styleType = stylesByType[type || "primary"]
  const stylesSize = stylesBySize[size || "medium"]
  const stylesBorderSize = stylesByBorderSize[size || "medium"]
  const opacity = disabled ? 0.4 : 1.0

  const finalButtonStyle = [
    styles.button,
    styleType.button,
    size ? styles[stylesSize] : null,
    borderRadius ? styles[stylesBorderSize] : null,
    passedRenderIcon ? styles.buttonWithIcon : null,
    disabled ? styleType.buttonDisabled : null,
    buttonStyle,
    {
      opacity,
      flexDirection: FlexDirectionFromIconPosition[iconPosition],
    },
  ]

  const finalTextStyle = [
    styles.title,
    styleType.title,
    disabled ? styles.buttonTitleDisabled : null,
    titleStyle,
  ]
  const finalIconStyle = [styles.icon, iconStyle]

  const renderLoading = (loadingStyle: ViewStyle | Array<ViewStyle>): ReactElement => (
    <ActivityIndicator color={styleType.buttonLoadingColor.color} style={loadingStyle} />
  )

  const renderIcon = ({ icon, loadingIcon, renderIconStyle }: RenderIconProps): ReactNode => {
    if (!icon) {
      return null
    }

    if (loadingIcon) {
      return renderLoading(renderIconStyle)
    }

    return passedRenderIcon()
  }

  return (
    <TouchableOpacity style={finalButtonStyle} disabled={disabled} onPress={onPress} hitSlop={hitSlopSize}>
      {loading && !passedRenderIcon ? (
        renderLoading(finalIconStyle)
      ) : (
        <Text size={TextSize.bodyMedium} style={finalTextStyle}>{title}</Text>
      )}
      {passedRenderIcon && <View style={{ width: iconSpace, height: iconSpace }} />}
      {renderIcon({
        icon: passedRenderIcon,
        loadingIcon: loading,
        renderIconStyle: finalIconStyle,
      })}
    </TouchableOpacity>
  )
}

export default Button