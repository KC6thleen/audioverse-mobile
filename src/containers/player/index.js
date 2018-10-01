import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { playPause, skipToPrevious, skipToNext, replay, forward, download, setRate } from 'src/actions'
import { getCurrentTrack, getPlaybackState, getRate, getLanguage } from 'src/reducers/selectors'

import Player from './Player'

const  mapStateToProps = state => ({
  state: getPlaybackState(state),
  track: getCurrentTrack(state),
  rate: getRate(state),
  language: getLanguage(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({
  playPause,
  skipToPrevious,
  skipToNext,
  replay,
  forward,
  download,
  setRate,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Player)
