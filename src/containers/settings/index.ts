import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'

import { AppState } from '../../store'
import {
  changeLanguage,
  changeBitRate,
  setAutoPlay,
  logOut,
} from '../../store/settings/actions'
import {
  getLanguage,
  getAutoPlay,
  getUser,
  getBitRate,
} from '../../reducers/selectors'

import Settings from './Settings'

const mapStateToProps = (state: AppState) => ({
  language: getLanguage(state),
  bitRate: getBitRate(state),
  autoPlay: getAutoPlay(state),
  user: getUser(state),
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({
    changeLanguage,
    changeBitRate,
    setAutoPlay,
    logOut,
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
