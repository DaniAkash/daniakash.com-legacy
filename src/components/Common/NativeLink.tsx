import React, { useRef, ReactNode } from "react"
import { A } from "@expo/html-elements"
import { useHover, useFocus, useActive } from "react-native-web-hooks"
import { StyleProp, TextStyle } from "react-native"
import { navigate } from "gatsby"

export interface NativeLinkProps {
  url: string
  style?: StyleProp<TextStyle>
  hoveredStyle?: StyleProp<TextStyle>
  focusedStyle?: StyleProp<TextStyle>
  activeStyle?: StyleProp<TextStyle>
  children?: ReactNode
  openNewTab?: boolean
}

const NativeLink = ({
  url,
  style,
  hoveredStyle,
  focusedStyle,
  activeStyle,
  children,
  openNewTab = false,
}: NativeLinkProps) => {
  const linkRef = useRef<any>(null)

  const isHovered = useHover(linkRef)
  const isFocused = useFocus(linkRef)
  const isActive = useActive(linkRef)

  const linkStyle = [
    style,
    isHovered && hoveredStyle,
    isFocused && focusedStyle,
    isActive && activeStyle,
  ]

  const newTabProps = openNewTab
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {}

  const clickHandler = (event: any) => {
    if (url.includes("://")) {
      return
    }
    event.preventDefault()
    navigate(url)
  }

  return (
    <A
      onPress={clickHandler}
      style={linkStyle}
      href={url}
      ref={linkRef}
      {...newTabProps}
    >
      {children}
    </A>
  )
}

export default NativeLink
