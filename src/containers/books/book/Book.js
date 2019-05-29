import React from 'react'
import PropTypes from 'prop-types'
import {
  Alert,
} from 'react-native'
import { ListItem } from 'react-native-elements'

import List from 'src/components/list'
import IconButton from 'src/components/buttons/IconButton'
import I18n from 'locales'
import { Dirs } from 'src/constants'

class Book extends React.PureComponent {

  handlePressItemAction = item => {
    if (item.local) {
      Alert.alert(
        I18n.t('Are_you_sure_you_want_to_delete_this'),
        '',
        [
          {text: I18n.t('Cancel'), onPress: () => {}, style: 'cancel'},
          {text: I18n.t('Yes'), onPress: () => { this.props.actions.removeLocalChapter(item) }}
        ]
      )
    } else {
      const mediaFile = item.mediaFiles[0]
      this.props.actions.download(
        item,
        Dirs.audiobooks,
        mediaFile.downloadURL,
        mediaFile.filename,
        mediaFile.bitrate,
        this.props.actions.addLocalFiles.bind(this, [item.id])
      )
    }
  }

  renderItem = ({ item }) => {
    return (
      <ListItem
        leftAvatar={
          {
            source: item.artwork && item.artwork.toString().startsWith('http') ? 
            { uri: item.artwork } : item.artwork
          }
        }
        title={item.title}
        titleProps={{numberOfLines: 1}}
        subtitle={item.artist}
        onPress={() => this.props.actions.resetAndPlayTrack(this.props.items, item.id)}
        bottomDivider
        rightElement={<RightElement data={item} onPress={this.handlePressItemAction} />}
      />
    )
  }
  
  render() {
    const { navigation, items, pagination, actions } = this.props

    return (
      <List
        navigation={navigation}
        items={items}
        pagination={pagination}
        actions={{loadData: actions.loadData}}
        renderItem={this.renderItem}
      />
    )
  }

}

Book.propTypes = {
  navigation: PropTypes.object.isRequired,
  items: PropTypes.array,
  pagination: PropTypes.object,
  actions: PropTypes.shape({
    loadData: PropTypes.func.isRequired,
    addLocalFiles: PropTypes.func.isRequired,
    removeLocalChapter: PropTypes.func.isRequired,
    download: PropTypes.func.isRequired,
  })
}

const RightElement = ({ data, onPress }) => {
  const handlePress = () => { onPress(data) }
  return <IconButton
    name={data.local ? 'x' : 'download'}
    size={24}
    onPress={handlePress}
    accessibilityLabel={I18n.t(data.local ? 'delete' : 'download_file')} />
}

export default Book
