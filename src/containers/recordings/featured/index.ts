import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'

import { AppState } from '../../../store'
import { loadFeaturedRecordings } from '../../../actions'
import {
  getFeaturedRecordings,
  getFeaturedRecordingsPagination,
} from '../../../reducers/selectors'

import List from '../../../components/list'

const mapStateToProps = (state: AppState) => ({
  items: getFeaturedRecordings(state),
  pagination: getFeaturedRecordingsPagination(state),
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({
    loadData: loadFeaturedRecordings,
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(List)
