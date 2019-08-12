import React, { useEffect, useRef } from 'react'
import {
  View,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  ListRenderItem,
} from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { ListItem } from 'react-native-elements'
import { Track } from 'react-native-track-player'

import { defaultImage } from '../../styles'
import { PaginationState } from '../../store/paginate'

interface Item {
  [key: string]: any
}

interface Props extends NavigationScreenProps {
  items: any[]
  pagination: PaginationState
  renderItem?: ListRenderItem<Item>
  keyExtractor?: (item: Item) => string
  avatarExtractor?: (item: Item) => string
  titleExtractor?: (item: Item) => string
  subtitleExtractor?: (item: Item) => string
  playlist?: boolean
  onPress?: (item: Item) => void
  localActions: {
    resetAndPlayTrack: (tracks: Track[], id: string | null) => void
  }
  actions: {
    loadData: (loadMore: boolean, refresh: boolean, url: string, id: string) => void
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    padding: 20,
    backgroundColor: '#CCCCCC50',
    textAlign: 'center'
  },
  headerImageContainer: {
    alignItems: 'center'
  },
  headerImage: {
    width: 128,
    height: 128,
    borderRadius: 64
  },
  headerText: {
    textAlign: 'justify',
    marginTop: 10,
  },
})

export const List: React.FC<Props> = ({
  navigation,
  items,
  pagination,
  renderItem,
  keyExtractor = (item) => item.id,
  avatarExtractor = (item) => item.artwork,
  titleExtractor = (item) => item.title,
  subtitleExtractor = (item) => item.artist + ' \u00B7 ' + item.durationFormatted,
  onPress,
  playlist = false,
  localActions,
  actions,
}) => {

  const onEndReachedCalledDuringMomentumRef = useRef(true)

  useEffect(() => {
    const { url, id } = navigation.state.params || { url: null, id: null }
    actions.loadData(false, false, url, id)
  }, [])

  if (!items.length && pagination.isFetching) {
    return (
      <ActivityIndicator
        size="large"
        color="#03A9F4"
        style={{margin: 50}}
      />
    )
  }

  const handleEndReached = () => {
    console.log('end reached!!', onEndReachedCalledDuringMomentumRef.current)
    if (!onEndReachedCalledDuringMomentumRef.current && pagination && pagination.nextPageUrl) {
      onEndReachedCalledDuringMomentumRef.current = true
      const { url, id } = navigation.state.params || { url: null, id: null }
      actions.loadData(true, false, url, id)
    }
  }

  const handleRefresh = () => {
    const { url, id } = navigation.state.params || { url: null, id: null }
    actions.loadData(false, true, url, id)
  }

  const avatar = (item: Item) => {
    const avatar = avatarExtractor(item)
    return {
      source: avatar && avatar.toString().startsWith('http') ? 
      { uri: avatar } : avatar ? avatar : defaultImage
    }
  }

  const handlePress = (item: Item) => {
    if (onPress) {
      onPress(item)
    } else {
      if (playlist) {
        localActions.resetAndPlayTrack(items, item.id)
      } else {
        localActions.resetAndPlayTrack([item as Track], null)
      }
    }
  }
  
  const localRenderItem: ListRenderItem<Item> = ({ item }) => {
    return (
      <ListItem
        leftAvatar={avatar(item)}
        title={titleExtractor(item)}
        titleProps={{numberOfLines: 1}}
        subtitle={subtitleExtractor(item)}
        onPress={() => handlePress(item)}
        bottomDivider
      />
    )
  }

  const { image, description } = navigation.state.params || { image: null, description: null }
  const Header =
    image && description ?
      <View style={styles.headerContainer}>
        <View style={styles.headerImageContainer}>
          <Image
            style={styles.headerImage}
            source={{uri: image}}
          />
        </View>
        { description ? <Text style={styles.headerText}>{description}</Text> : null }
      </View>
    : null
    

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={Header}
        data={items}
        renderItem={renderItem ? renderItem : localRenderItem}
        keyExtractor={keyExtractor}
        refreshing={pagination.isFetching}
        onRefresh={handleRefresh}
        onEndReachedThreshold={0.1}
        onEndReached={handleEndReached}
        onMomentumScrollBegin={() => { onEndReachedCalledDuringMomentumRef.current = false }}
      />
    </View>
  )
}

export default List
