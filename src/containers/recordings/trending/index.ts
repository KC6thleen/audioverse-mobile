import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'

import { AppState } from '../../../store'
import { loadTrendingRecordings } from '../../../actions'
import {
  getTrendingRecordings,
  getTrendingRecordingsPagination,
} from '../../../reducers/selectors'

import List from '../../../components/list'

const mapStateToProps = (state: AppState) => ({
  items: getTrendingRecordings(state),
  pagination: getTrendingRecordingsPagination(state),
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({
    loadData: loadTrendingRecordings,
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(List)
