import { connect } from 'react-redux'

import { playPause, skipToPrevious, skipToNext, replay, forward, setRate } from '../../actions'
import { getCurrentTrack, getPlaybackState, getRate, getLanguage } from '../../reducers/selectors'

import NowPlaying from './NowPlaying'

const  mapStateToProps = state => ({
  state: getPlaybackState(state),
  track: getCurrentTrack(state),
  rate: getRate(state),
  language: getLanguage(state)
})

const mapDispatchToProps = dispatch => ({
  playPause: () => dispatch(playPause()),
  skipToPrevious: () => dispatch(skipToPrevious()),
  skipToNext: () => dispatch(skipToNext()),
  replay: () => dispatch(replay()),
  forward: () => dispatch(forward()),
  setRate: () => dispatch(setRate())
})

export default connect(mapStateToProps, mapDispatchToProps)(NowPlaying)
