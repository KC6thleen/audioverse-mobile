import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'

import { AppState } from '../../store'
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
} from '../../actions'
import {
  getCurrentTrack,
  getRate,
  getLanguage,
  getUser,
  isFavorite,
  getBitRate,
} from '../../reducers/selectors'

import Player from './Player'

const  mapStateToProps = (state: AppState) => ({
  track: getCurrentTrack(state),
  rate: getRate(state),
  language: getLanguage(state),
  user: getUser(state),
  isFavorite: isFavorite(state),
  bitRate: getBitRate(state),
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
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
