import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View, FlatList, Alert, StyleSheet } from 'react-native'

import ListItem from 'src/components/list/ListItem'
import MiniPlayer from 'src/components/miniplayer'
import IconButton from 'src/components/buttons/IconButton'
import I18n from 'locales'

class Downloads extends PureComponent {

  handleRemove = item => {
    Alert.alert(
      I18n.t('Are_you_sure'),
      '',
      [
        {text: I18n.t('Cancel'), onPress: () => {}, style: 'cancel'},
        {text: I18n.t('Yes'), onPress: () => { this.props.actions.remove(item) }}
      ]
    )
  }

  renderItem = ({ item }) => {
    return (
      <ListItem
        avatar={{source: item.artwork}}
        title={item.title}
        subtitle={`${item.artist} \u00B7 ${item.bitRate} kbps`}
        onPress={() => this.props.actions.resetAndPlayTrack([item])}
        rightElement={<RightElement data={item} onPress={this.handleRemove} />}
      />
    )
  }

  render() {
    const { items } = this.props

    return (
      <View style={styles.container}>
        <FlatList
          data={items}
          renderItem={this.renderItem}
          keyExtractor={item => item.fileName}
        />
        <MiniPlayer navigation={this.props.navigation} />
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  }
})

Downloads.propTypes = {
  navigation: PropTypes.object.isRequired,
  items: PropTypes.array,
  actions: PropTypes.shape({
    resetAndPlayTrack: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired
  })
}

const RightElement = ({ data, onPress }) => {
  const _onPress = () => { onPress(data) }
  return <IconButton onPress={_onPress} name="x" size={24} />
}

export default Downloads
