import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { changeLanguage, setAutoPlay, logOut } from 'src/actions'
import { getLanguage, getAutoPlay, getUser } from 'src/reducers/selectors'

import Settings from './Settings'

const mapStateToProps = (state) => ({
  language: getLanguage(state),
  autoPlay: getAutoPlay(state),
  user: getUser(state)
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    changeLanguage,
    setAutoPlay,
    logOut
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
