import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { setUser } from 'src/actions'
import { getLanguage } from 'src/reducers/selectors'

import Login from './Login'

const mapStateToProps = state => ({
  language: getLanguage(state)
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    setUser
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
