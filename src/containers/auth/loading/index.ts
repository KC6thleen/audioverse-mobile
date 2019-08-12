import { connect } from 'react-redux'

import { AppState } from '../../../store'
import { getUser } from '../../../reducers/selectors'

import Loading from './Loading'

const mapStateToProps = (state: AppState) => ({
  user: getUser(state),
})

export default connect(mapStateToProps)(Loading)
