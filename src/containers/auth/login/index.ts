import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'

import { AppState } from '../../../store'
import { setUser } from '../../../store/user/actions'
import { getLanguage } from '../../../reducers/selectors'

import Login from './Login'
const mapStateToProps = (state: AppState) => ({
  language: getLanguage(state),
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({
    setUser,
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
