import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'

import { AppState } from '../../../store'
import { resetAndPlayTrack } from '../../../actions'
import { removeHistory } from '../../../store/lists/actions'
import { getHistory } from '../../../reducers/selectors'

import History from './History'

const mapStateToProps = (state: AppState) => ({
  items: getHistory(state),
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({
    resetAndPlayTrack,
    remove: removeHistory,
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(History)
