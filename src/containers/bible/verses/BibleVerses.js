import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View, WebView, StyleSheet } from 'react-native'

import MiniPlayer from 'src/components/miniplayer'
import { Endpoints } from 'src/constants'

class BibleVerses extends PureComponent {

  componentDidMount() {
    if (this.props.bible.verses !== '') {
      this.props.actions.loadBibleVerses()
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <WebView
          source={{ html: this.props.bible.verses }} />
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

BibleVerses.propTypes = {
  navigation: PropTypes.object.isRequired,
  bible: PropTypes.object,
  actions: PropTypes.shape({
    loadBibleVerses: PropTypes.func.isRequired
  })
}

export default BibleVerses
