import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { changeLanguage } from 'src/actions'
import { getLanguage } from 'src/reducers/selectors'

import Settings from './Settings'

const mapStateToProps = (state) => ({
  language: getLanguage(state)
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    changeLanguage
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
