import { connect } from 'react-redux'

import { loadTopic, resetAndPlayTrack } from 'src/actions'
import { getTopic, getTopicPagination } from 'src/reducers/selectors'

import Topic from './Topic'

const mapStateToProps = (state) => ({
  items: getTopic(state),
  pagination: getTopicPagination(state)
})

const mapDispatchToProps = (dispatch) => ({
  load: (url) => dispatch(loadTopic(false, false, url)),
  loadMore: (url) => dispatch(loadTopic(true, false, url)),
  refresh: (url) => dispatch(loadTopic(false, true, url)),
  resetAndPlayTrack: (tracks, id) => dispatch(resetAndPlayTrack(tracks, id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Topic)
