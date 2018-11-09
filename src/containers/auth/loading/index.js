import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { getUser } from 'src/reducers/selectors'

import Loading from './Loading'

const mapStateToProps = state => ({
  user: getUser(state)
})

export default connect(mapStateToProps)(Loading)
