import React, { useState, useEffect } from 'react'
import {
  View,
  ActivityIndicator,
  Platform,
  StyleSheet,
} from 'react-native'
import { WebView } from 'react-native-webview'
import { Track } from 'react-native-track-player'

import I18n from '../../../../locales'
import { fetchData } from "../../../services"
import { Endpoints } from "../../../constants"

interface Props {
  track: Track | undefined
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

const Transcript: React.FC<Props> = ({ track }) => {

  const [transcript, setTranscript] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTranscript = async () => {
      const { result } = await fetchData(`${Endpoints.transcripts}/${track!.id}`)
      if (result.length) {
        setTranscript(result[0].transcripts.transcript)
        setLoading(false)
      } else {
        setLoading(false)
      }
    }

    fetchTranscript()
  }, [])

  return (
    <View style={styles.container}>
      {loading && 
        <View style={styles.activityIndicator}>
          <ActivityIndicator
            size="large"
            color="#03A9F4"
            style={{margin: 50}}
          />
        </View>
      }
      {!loading &&
        <WebView
          style={styles.webView}
          source={{html: `<p style="font-size:${Platform.OS === 'ios'?'58':'29'}px;text-align:center">${transcript}<br><br>${I18n.t('note_transcript', {email: 'media@audioverse.org'})}</p>`}} />
      }
    </View>
  )

}

export default Transcript
