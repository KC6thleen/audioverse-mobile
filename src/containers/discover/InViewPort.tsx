import React, { useState, useEffect, useRef } from 'react'
import {
  View,
  Dimensions,
} from 'react-native'

interface Props {
  onChange: (isVisible: boolean) => void
  disabled: boolean
  delay?: number
}

const InViewPort: React.FC<Props> = ({ children, onChange, disabled, delay, ...props }) => {

  const [rect, setRect] = useState({top: 0, bottom: 0, width: 0})
  const myViewRef: any = useRef(null)
  const intervalRef: any = useRef(null)
  const lastValueRef: any = useRef(null)

  useEffect(() => {
    if (disabled) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    } else {
      lastValueRef.current = null
      if (intervalRef.current) {
        return
      }

      intervalRef.current = setInterval(() => {
        if (!myViewRef.current) {
          return
        }
        myViewRef.current.measure((x: number, y: number, width: number, height: number, pageX: number, pageY: number) => {
          setRect({
            top: pageY,
            bottom: pageY + height,
            width: pageX + width
          })
        })

      }, delay || 2000)
    }

    return function cleanup() {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [disabled])

  useEffect(() => {
    const window = Dimensions.get('window')
    const isVisible =
      rect.bottom != 0 &&
      rect.top >= 0 &&
      rect.bottom <= window.height &&
      rect.width > 0 &&
      rect.width <= window.width

    if (lastValueRef.current !== isVisible) {
      lastValueRef.current = isVisible
      onChange(isVisible)
    }
  }, [rect])

  return (
    <View
      collapsable={false}
      ref={myViewRef}
      {...props}>
      {children}
    </View>
  )
}

export default InViewPort
