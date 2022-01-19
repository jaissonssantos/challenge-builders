import React from "react"
import { Text as RNText, TextProps, StyleSheet } from "react-native"
import styles from "./styles"

export enum TextSize {
  headingTitle = "headingTitle",
  headline = "headline",
  bodyCaption = "bodyCaption",
  bodyMedium = "bodyMedium",
  bodyFootnote = "bodyFootnote",
}

export interface TextComponentProps extends TextProps {
  size?: TextSize
  children?: React.ReactNode
}

const Text: React.FC<TextComponentProps> = ({
  children,
  style,
  size,
  ...otherProps
}: TextComponentProps) => (
    <RNText
      {...otherProps}
      style={StyleSheet.flatten([styles.bodyCaption, size ? styles[size] : null, style])}
    >
      {children}
    </RNText>
)

export default Text