import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'
import { SearchBar } from 'react-native-elements'

import List from 'src/components/list/List'
import ListItem from 'src/components/list/ListItem'
import I18n from 'locales'

class Presenters extends PureComponent {

  state = {
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

  handleChangeText = text => {
    text = text.toLowerCase()
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
        avatar={{source: item.photo86}}
        title={item.givenName + ' ' + item.surname}
        onPress={() => this.props.navigation.navigate({ routeName: 'Presenter', params: { url: item.recordingsURI, title: item.givenName + ' ' + item.surname, description: item.description, image: item.photo256 } })}
      />
    )
  }

  renderHeader = () => {
    return(
      <SearchBar
        lightTheme
        round
        autoCorrect={false}
        placeholder={I18n.t('search')}
        focus
        ref={search => this.search = search}
        onChangeText={this.handleChangeText}
        accessibilityRole="search"
        accessibilityLabel={I18n.t("search")} />
    )
  }

  render() {
    const { items, pagination } = this.props

    return (
      <View style={styles.container}>
        <List
          ListHeaderComponent={this.renderHeader}
          renderItem={this.renderItem}
          items={this.state.data}
          {...pagination}
          onRefresh={this.handleRefresh} />
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

Presenters.propTypes = {
  navigation: PropTypes.object.isRequired,
  items: PropTypes.array,
  pagination: PropTypes.object,
  actions: PropTypes.shape({
    loadPresenters: PropTypes.func.isRequired
  })
}

export default Presenters
