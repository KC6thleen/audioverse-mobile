import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View, WebView, StyleSheet } from 'react-native'

class BibleVerses extends PureComponent {

  componentDidMount() {
    if (this.props.bible.verses === '') {
      this.props.actions.loadBibleVerses()
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <WebView
          originWhitelist={['*']}
          source={{ html: this.props.bible.verses }} />
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

BibleVerses.propTypes = {
  bible: PropTypes.object,
  actions: PropTypes.shape({
    loadBibleVerses: PropTypes.func.isRequired
  })
}

export default BibleVerses
