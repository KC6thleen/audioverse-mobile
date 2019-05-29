import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native'
import { SearchBar, ListItem } from 'react-native-elements'

import I18n from 'locales'

class Presenters extends React.PureComponent {

  state = {
    search: '',
    data: []
  }

  componentDidMount() {
    this.props.actions.loadPresenters()
    this.setState({
      data: this.props.items
    })
  }

  componentDidUpdate(prevProps) {
    if (this.props.items !== prevProps.items) {
      this.setState({
        data: this.props.items
      })
    }
  }

  handleChangeText = search => {
    this.setState({ search })
    text = search.toLowerCase()
    const filteredData = this.props.items.filter(el => {
      return `${el.surname} ${el.givenName}`.toLowerCase().indexOf(text) > -1
    })
    this.setState({
      data: filteredData
    })
  }

  handleRefresh = () => {
    this.props.actions.loadPresenters(false, true)
    this.search.clear()
  }

  renderItem = ({ item }) => {
    return (
      <ListItem
        leftAvatar={{
          source: item.photo86 && item.photo86.toString().startsWith('http') ? 
          { uri: item.photo86 } : item.photo86
        }}
        title={item.givenName + ' ' + item.surname}
        titleProps={{numberOfLines: 1}}
        onPress={() => 
          this.props.navigation.navigate({
            routeName: 'Presenter',
            params: {
              url: item.recordingsURI,
              title: item.givenName + ' ' + item.surname,
              description: item.description,
              image: item.photo256
            }
          })
        }
        bottomDivider
      />
    )
  }

  get header() {
    return (
      <SearchBar
        lightTheme
        round
        autoCorrect={false}
        placeholder={I18n.t('search')}
        focus
        ref={search => this.search = search}
        value={this.state.search}
        onChangeText={this.handleChangeText}
        accessibilityRole="search"
        accessibilityLabel={I18n.t("search")} />
    )
  }

  render() {
    const { pagination } = this.props

    if (!this.state.data.length && pagination.isFetching) {
      return (
        <ActivityIndicator
          size="large"
          color="#03A9F4"
          style={{margin: 50}}
        />
      )
    }

    return (
      <View style={styles.container}>
        <FlatList
          ListHeaderComponent={this.header}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
          data={this.state.data}
          refreshing={pagination.isFetching}
          onRefresh={this.handleRefresh} />
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

Presenters.propTypes = {
  navigation: PropTypes.object.isRequired,
  items: PropTypes.array,
  pagination: PropTypes.object,
  actions: PropTypes.shape({
    loadPresenters: PropTypes.func.isRequired,
  }),
}

export default Presenters
