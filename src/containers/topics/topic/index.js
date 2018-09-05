import { connect } from 'react-redux'

import { loadTopic, resetAndPlayTrack } from '../../../actions'
import { getTopic, getTopicPagination } from '../../../reducers/selectors'

import Topic from './Topic'

const mapStateToProps = (state) => ({
  items: getTopic(state),
  pagination: getTopicPagination(state)
})

const mapDispatchToProps = (dispatch) => ({
  load: (url) => dispatch(loadTopic(false, false, url)),
  loadMore: (url) => dispatch(loadTopic(true, false, url)),
  refresh: (url) => dispatch(loadTopic(false, true, url)),
  resetAndPlayTrack: (tracks, track) => dispatch(resetAndPlayTrack(tracks, track))
})

export default connect(mapStateToProps, mapDispatchToProps)(Topic)
