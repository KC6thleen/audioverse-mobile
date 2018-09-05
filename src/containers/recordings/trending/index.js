import { connect } from 'react-redux'

import { loadTrendingRecordings, resetAndPlayTrack } from '../../../actions'
import { getTrendingRecordings, getTrendingRecordingsPagination } from '../../../reducers/selectors'

import TrendingRecordings from './TrendingRecordings'

const mapStateToProps = state => ({
  items: getTrendingRecordings(state),
  pagination: getTrendingRecordingsPagination(state)
})

const mapDispatchToProps = dispatch => ({
  load: (loadMore, refresh) => dispatch(loadTrendingRecordings(loadMore, refresh)),
  loadMore: () => dispatch(loadTrendingRecordings(true, false)),
  refresh: () => dispatch(loadTrendingRecordings(false, true)),
  resetAndPlayTrack: (tracks, track) => dispatch(resetAndPlayTrack(tracks, track))
})

export default connect(mapStateToProps, mapDispatchToProps)(TrendingRecordings)
