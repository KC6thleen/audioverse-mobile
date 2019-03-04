import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  FlatList,
  StyleSheet
} from 'react-native'
import ActionSheet from 'react-native-action-sheet'
import { SearchBar } from 'react-native-elements'
import firebase from 'react-native-firebase'

import HeaderTitle from 'src/navigators/headertitle'
import IconButton from 'src/components/buttons/IconButton'
import I18n from 'locales'
import { Endpoints } from 'src/constants'
import ListItem from 'src/components/list/ListItem'
import MiniPlayer from 'src/components/miniplayer'
import {
  searchPresentations,
  fetchData
} from 'src/services'

class Search extends PureComponent {

  state = {
    search: '',
    category: I18n.t('presentations'),
    loading: false,
    data: [],
    nextPageUrl: ''
  }

  static navigationOptions = ({ navigation }) => ({
    headerTitle: <HeaderTitle title="search" />,
    headerRight:<IconButton
      name="more-vertical"
      size={24}
      color="#FFFFFF"
      style={{paddingHorizontal: 15}}
      onPress={() => { navigation.state.params.handleMore() }}
      accessibilityLabel={I18n.t("search_filters")} />
  })  

  componentDidMount() {
    this.search.focus()
    this.props.navigation.setParams({handleMore: this.handleMore})
  }

  handleMore = () => {
    const options = [
      I18n.t('presentations'),
      I18n.t('presenters'),
      I18n.t('conferences'),
      I18n.t('Cancel')
    ]

    ActionSheet.showActionSheetWithOptions({
      title: '',
      options: options,
      cancelButtonIndex: options.length - 1,
    }, buttonIndex => {
      if (typeof buttonIndex !== 'undefined' && buttonIndex !== options.length - 1) {
        if (this.state.category !== options[buttonIndex]) {
          this.setState({
            category: options[buttonIndex],
            data: []
          }, () => {
            this.search.clear()
            this.search.focus()
          })
        }
      }
    })
  }

  handleSearch = async () => {
    if (this.state.search.trim() !== '') {
      // firebase analytics
      firebase.analytics().logEvent('search', { search_term: this.state.search })
      // search
      let url = '', searchFn = null, parseFn = null
      if (this.state.category === I18n.t('presentations')) {
        url = Endpoints.searchPresentations
        searchFn = searchPresentations
        parseFn = data => data
      } else if (this.state.category === I18n.t('presenters')) {
        url = Endpoints.searchPresenters
        searchFn = fetchData
        parseFn = data => data.map(el => el.presenters)
      } else { // conferences
        url = Endpoints.searchConferences
        searchFn = fetchData
        parseFn = data => data.map(el => el.conferences)
      }

      try {
        this.setState({ loading: true })
        let response = await searchFn(url + this.state.search)
        this.setState({
          loading: false,
          data: parseFn(response.result),
          nextPageUrl: response.nextPageUrl
        })
      } catch(e) {
        console.log(e)
        this.setState({ loading: false })
      }
    }
  }

  handleChangeText = text => {
    this.setState({search: text})
  }

  renderHeader = () => {
    return (
      <SearchBar
        lightTheme
        round
        autoCorrect={false}
        placeholder={I18n.t('search')}
        focus
        showLoadingIcon={this.state.loading}
        ref={search => this.search = search}
        onChangeText={this.handleChangeText}
        onSubmitEditing={this.handleSearch}
        accessibilityRole="search"
        accessibilityLabel={I18n.t("search")} />
    )
  }

  renderItem = ({ item }) => {
    if (this.state.category === I18n.t('presentations')) {
      return (
        <ListItem
          avatar={{source: item.artwork}}
          title={item.title}
          subtitle={item.artist + ' \u00B7 ' + item.duration}
          onPress={() => this.props.actions.resetAndPlayTrack([item])}
        />
      )
    } else if (this.state.category === I18n.t('presenters')) {
      return (
        <ListItem
          avatar={{source: item.photo86}}
          title={item.givenName + ' ' + item.surname}
          onPress={() => this.props.navigation.navigate({ routeName: 'Presenter', params: { url: item.recordingsURI, title: item.givenName + ' ' + item.surname } })}
        />
      )
    } else { // conferences
      return (
        <ListItem
          avatar={{source: item.photo86}}
          title={item.title}
          onPress={() => this.props.navigation.navigate({ routeName: 'Conference', params: { url: item.recordingsURI, title: item.title } })}
        />
      )
    }
  }

  render() {
    const { items, pagination } = this.props

    return (
      <View style={styles.container}>
        <FlatList
          ListHeaderComponent={this.renderHeader}
          renderItem={this.renderItem}
          data={this.state.data}
          keyExtractor={item => item.id}
          refreshing={false}
          onRefresh={this.handleSearch} />
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

Search.propTypes = {
  navigation: PropTypes.object.isRequired,
  actions: PropTypes.shape({
    resetAndPlayTrack: PropTypes.func.isRequired
  })
}

export default Search
