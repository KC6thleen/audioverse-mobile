import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { changeLanguage, setAutoPlay, logOut, changeBitRate } from 'src/actions'
import { getLanguage, getAutoPlay, getUser, getBitRate } from 'src/reducers/selectors'

import Settings from './Settings'

const mapStateToProps = (state) => ({
  language: getLanguage(state),
  bitRate: getBitRate(state),
  autoPlay: getAutoPlay(state),
  user: getUser(state),
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    changeLanguage,
    changeBitRate,
    setAutoPlay,
    logOut,
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
