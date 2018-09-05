import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, View, Text, Image, Platform, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'

const ListItem = ({ style, avatar, icon, title, subtitle, rightElement, chevron, chevronColor, onPress }) => (
  <View>
    <PadView style={[styles.container, style]}>
      {renderIcon(icon)}
      {renderAvatar(avatar)}
      {(title || subtitle) && (
        <TouchableOpacity style={styles.contentContainer} onPress={onPress}>
          {renderNode(title, null, [styles.title])}
          {renderNode(subtitle, null, [styles.subtitle])}
        </TouchableOpacity>
      )}
      {renderNode(rightElement)}
      {chevron && <Icon name="chevron-right" size={26} color={chevronColor} onPress={onPress} />}
    </PadView>
    <View style={styles.divider} />
  </View>
)

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: Platform.OS === 'ios' ? 10 : 8
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  title: {
    fontSize: Platform.OS === 'ios' ? 17 : 16
  },
  subtitle: {
    fontSize: Platform.OS === 'ios' ? 15 : 14,
    color: '#212121'
  },
  divider: {
    // darker color if hairlineWidth is not thin enough
    backgroundColor: StyleSheet.hairlineWidth < 1 ? '#BCBBC1' : 'rgba(0, 0, 0, 0.12)',
    height: StyleSheet.hairlineWidth
  }
})

const elementOrObject = PropTypes.oneOfType([
  PropTypes.element,
  PropTypes.object
])

ListItem.propTypes = {
  avatar: elementOrObject,
  icon: elementOrObject,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  rightElement: PropTypes.element,
  chevron: PropTypes.bool,
  chevronColor: PropTypes.string,
  onPress: PropTypes.func
}

ListItem.defaultProps = {
  chevronColor: '#D1D1D6'
}

const PadView = ({ children, pad = 16, ...props }) => {
  const childrens = React.Children.toArray(children)
  const length = childrens.length
  return (
    <View {...props}>
      {React.Children.map(
        childrens,
        (child, index) =>
          child && [child, index !== length -1 && <View width={pad} />]
      )}
    </View>
  )
}

const renderAvatar = content =>
  content == null ? null : React.isValidElement(content) ? (
    content
  ) : (
    <Image {...content} source={content.source.toString().startsWith('http') ? {uri: content.source} : content.source} style={[styles.avatar, content.style]} />
  )

const renderIcon = content =>
  content == null ? null : React.isValidElement(content) ? (
    content
  ) : (
    <Icon size={24} color="rgba(0, 0, 0, 0.40)" {...content} />
  )

const renderNode = (content, props, style) =>
  content == null ? null : React.isValidElement(content) ? (
    content
  ) : (
    <Text ellipsizeMode={'tail'} numberOfLines={1} {...props} style={[style, props && props.style]}>
      {content}
    </Text>
  )

export default ListItem
