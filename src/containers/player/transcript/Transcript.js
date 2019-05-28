import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  WebView,
  ActivityIndicator,
  Platform,
  StyleSheet,
} from 'react-native'

import I18n from 'locales'
import { fetchData } from "src/services"
import { Endpoints } from "src/constants"

class Transcript extends PureComponent {

  state = {
    transcript: '',
    loading: true,
  }

  async componentDidMount () {
    if (this.state.transcript === '') {
      const { result } = await fetchData(`${Endpoints.transcripts}/${this.props.track.id}`)
      if (result.length) {
        this.setState({transcript: result[0].transcripts.transcript, loading: false})
      } else {
        this.setState({loading: false})
      }
    }
  }

  render() {

    return (
      <View style={styles.container}>
        {this.state.loading && 
          <View style={styles.activityIndicator}>
            <ActivityIndicator
              size="large"
              color="#03A9F4"
              style={{margin: 50}}
            />
          </View>
        }
        {!this.state.loading &&
          <WebView
            style={styles.webView}
            source={{html: `<p style="font-size:${Platform.OS === 'ios'?'58':'29'}px;text-align:center">${this.state.transcript}<br><br>${I18n.t('note_transcript', {email: 'media@audioverse.org'})}</p>`}} />
        }
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  activityIndicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  webView: {
    marginTop: 10,
    marginHorizontal: 10,
  },
})

Transcript.propTypes = {
  track: PropTypes.object.isRequired,
}

export default Transcript
