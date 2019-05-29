import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  FlatList,
  Alert,
  StyleSheet,
} from 'react-native'
import { ListItem } from 'react-native-elements'

import IconButton from 'src/components/buttons/IconButton'
import I18n from 'locales'
import { Dirs } from 'src/constants'

class BibleChapters extends React.PureComponent {

  componentDidMount() {
    if (!this.props.items.length) {
      this.props.actions.loadBibleChapters(false, false, this.props.bible.book)
    }
  }

  handlePressItem = item => {
    this.props.actions.bibleChapter(item.chapter)

    const { items, actions, navigation } = this.props

    actions.resetAndPlayTrack(items, item.id)
    navigation.navigate({ routeName: 'Verses' })

  }

  handlePressItemAction = item => {
    if (item.local) {
      Alert.alert(
        I18n.t('Are_you_sure_you_want_to_delete_this'),
        '',
        [
          {text: I18n.t('Cancel'), onPress: () => {}, style: 'cancel'},
          {text: I18n.t('Yes'), onPress: () => { this.props.actions.removeLocalBibleChapter(item) }}
        ]
      )
    } else {
      this.props.actions.download(
        item,
        Dirs.bible,
        item.downloadURL,
        item.fileName,
        '',
        this.props.actions.addLocalFiles.bind(this, [item.id])
      )
    }
  }

  renderItem = ({ item }) => {
    return (
      <ListItem
        title={`${this.props.bible.book.name} ${item.chapter}`}
        onPress={this.handlePressItem.bind(this, item)}
        rightElement={<RightElement data={item} onPress={this.handlePressItemAction} />}
        bottomDivider
      />
    )
  }
  
  render() {
    
    const { items, pagination } = this.props

    return (
      <View style={styles.container}>
        <FlatList
          data={items}
          renderItem={this.renderItem}
          keyExtractor={item => item.chapter}
          refreshing={pagination.isFetching}
        />
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    width: '25%',
    padding: 15,
    alignItems: 'center',
  },
  chapter: {
    fontSize: 18,
  },
})

BibleChapters.propTypes = {
  navigation: PropTypes.object.isRequired,
  items: PropTypes.array,
  pagination: PropTypes.object,
  bible: PropTypes.object,
  actions: PropTypes.shape({
    bibleChapter: PropTypes.func.isRequired,
    loadBibleChapters: PropTypes.func.isRequired,
    download: PropTypes.func.isRequired,
    addLocalFiles: PropTypes.func.isRequired,
    removeLocalBibleChapter: PropTypes.func.isRequired,
    resetAndPlayTrack: PropTypes.func.isRequired,
  }),
}

const RightElement = ({ data, onPress }) => {
  const handlePress = () => { onPress(data) }
  return <IconButton
    name={data.local ? 'x' : 'download'}
    size={24}
    onPress={handlePress}
    accessibilityLabel={I18n.t(data.local ? 'delete' : 'download_file')} />
}

export default BibleChapters
