import { connect } from 'react-redux'

import { loadConference, resetAndPlayTrack } from '../../../actions'
import { getConference, getConferencePagination } from '../../../reducers/selectors'

import Conference from './Conference'

const mapStateToProps = (state) => ({
  items: getConference(state),
  pagination: getConferencePagination(state)
})

const mapDispatchToProps = (dispatch) => ({
  load: (url) => dispatch(loadConference(false, false, url)),
  loadMore: (url) => dispatch(loadConference(true, false, url)),
  refresh: (url) => dispatch(loadConference(false, true, url)),
  resetAndPlayTrack: (tracks, track) => dispatch(resetAndPlayTrack(tracks, track))
})

export default connect(mapStateToProps, mapDispatchToProps)(Conference)
