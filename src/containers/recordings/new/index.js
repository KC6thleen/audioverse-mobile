import { connect } from 'react-redux'

import { loadNewRecordings, resetAndPlayTrack } from 'src/actions'
import { getNewRecordings, getNewRecordingsPagination } from 'src/reducers/selectors'

import NewRecordings from './NewRecordings'

const mapStateToProps = state => ({
  items: getNewRecordings(state),
  pagination: getNewRecordingsPagination(state)
})

const mapDispatchToProps = dispatch => ({
  load: (loadMore, refresh) => dispatch(loadNewRecordings(loadMore, refresh)),
  loadMore: () => dispatch(loadNewRecordings(true, false)),
  refresh: () => dispatch(loadNewRecordings(false, true)),
  resetAndPlayTrack: (tracks, id) => dispatch(resetAndPlayTrack(tracks, id))
})

export default connect(mapStateToProps, mapDispatchToProps)(NewRecordings)
