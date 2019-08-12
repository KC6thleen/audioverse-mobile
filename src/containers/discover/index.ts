import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'

import { AppState } from '../../store'
import { resetAndPlayTrack } from '../../actions'
import { getHistory } from '../../reducers/selectors'

import Discover from './Discover'

const mapStateToProps = (state: AppState) => ({
  history: getHistory(state),
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({
    resetAndPlayTrack,
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Discover)
