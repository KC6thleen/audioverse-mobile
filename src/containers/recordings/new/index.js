import { connect } from 'react-redux'

import { loadNewRecordings, resetAndPlayTrack } from '../../../actions'
import { getNewRecordings, getNewRecordingsPagination } from '../../../reducers/selectors'

import NewRecordings from './NewRecordings'

const mapStateToProps = state => ({
  items: getNewRecordings(state),
  pagination: getNewRecordingsPagination(state)
})

const mapDispatchToProps = dispatch => ({
  load: (loadMore, refresh) => dispatch(loadNewRecordings(loadMore, refresh)),
  loadMore: () => dispatch(loadNewRecordings(true, false)),
  refresh: () => dispatch(loadNewRecordings(false, true)),
  resetAndPlayTrack: (tracks, track) => dispatch(resetAndPlayTrack(tracks, track))
})

export default connect(mapStateToProps, mapDispatchToProps)(NewRecordings)
