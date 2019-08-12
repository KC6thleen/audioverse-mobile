import React from 'react'
import {
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from 'react-native'

interface Props {
  onPress: () => void
  style?: {}
  imageStyle?: {}
  accessibilityLabel?: string,
  source: ImageSourcePropType
}

export const ImageButton: React.FC<Props> = ({
  onPress,
  style,
  imageStyle,
  accessibilityLabel,
  source,
  ...props
}) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={style}
        accessible={true}
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="button">
        <Image source={source} {...props} style={imageStyle} />
      </TouchableOpacity>
    )
}

export default ImageButton
