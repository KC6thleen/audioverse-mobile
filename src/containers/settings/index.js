import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { changeLanguage, setAutoPlay } from 'src/actions'
import { getLanguage, getAutoPlay } from 'src/reducers/selectors'

import Settings from './Settings'

const mapStateToProps = (state) => ({
  language: getLanguage(state),
  autoPlay: getAutoPlay(state)
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    changeLanguage,
    setAutoPlay
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
