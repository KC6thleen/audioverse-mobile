import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'

import { AppState } from '../../../store'
import { loadNewRecordings } from '../../../actions'
import {
  getNewRecordings,
  getNewRecordingsPagination,
} from '../../../reducers/selectors'

import List from '../../../components/list'

const mapStateToProps = (state: AppState) => ({
  items: getNewRecordings(state),
  pagination: getNewRecordingsPagination(state),
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({
    loadData: loadNewRecordings,
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(List)
