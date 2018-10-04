import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { loadTrendingRecordings, resetAndPlayTrack } from 'src/actions'
import { getTrendingRecordings, getTrendingRecordingsPagination } from 'src/reducers/selectors'

import TrendingRecordings from './TrendingRecordings'

const mapStateToProps = state => ({
  items: getTrendingRecordings(state),
  pagination: getTrendingRecordingsPagination(state)
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    loadTrendingRecordings,
    resetAndPlayTrack
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(TrendingRecordings)
