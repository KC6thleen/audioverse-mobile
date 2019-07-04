import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {
  playPause,
  skipToPrevious,
  skipToNext,
  replay,
  forward,
  download,
  setRate,
  addFavorite,
  removeFavorite,
  playVideo,
  setBitRateAndReset,
} from 'src/actions'
import {
  getCurrentTrack,
  getRate,
  getLanguage,
  getUser,
  isFavorite,
  getBitRate,
} from 'src/reducers/selectors'

import Player from './Player'

const  mapStateToProps = state => ({
  track: getCurrentTrack(state),
  rate: getRate(state),
  language: getLanguage(state),
  user: getUser(state),
  isFavorite: isFavorite(state),
  bitRate: getBitRate(state),
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    playPause,
    skipToPrevious,
    skipToNext,
    replay,
    forward,
    download,
    setRate,
    addFavorite,
    removeFavorite,
    playVideo,
    setBitRateAndReset,
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Player)
