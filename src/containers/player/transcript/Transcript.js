import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  WebView,  
  Text,
  Button,
  ActivityIndicator,
  StyleSheet,
} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'

import I18n from 'locales'
import MiniPlayer from 'src/components/miniplayer'
import { fetchData } from "src/services";
import { Endpoints } from "src/constants";

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

  handleClose = () => {
    this.props.navigation.goBack()
  }

  render() {

    const { track } = this.props

    return (
      <View style={styles.container}>
        <Icon
          name="x-circle"
          size={30}
          style={styles.close}
          onPress={this.handleClose} />
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
          <View style={styles.card}>
            <Text style={styles.title}>{I18n.t('transcript')}</Text>
            <WebView source={{html: `<p style="font-size:58px;text-align:center">${this.state.transcript}</p>`}} />
          </View>
        }
        <MiniPlayer navigation={this.props.navigation} />
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
  },
  close: {
    zIndex: 10,
    position: 'absolute',
    left: 10,
    top: 40,
  },
  activityIndicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    flex: 1,
    marginTop: 30,
    padding: 20,
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 10,
  },
})

Transcript.propTypes = {
  track: PropTypes.object.isRequired,
}

export default Transcript
