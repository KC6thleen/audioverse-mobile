import { connect } from 'react-redux'

import { loadStory, resetAndPlayTrack } from '../../../actions'
import { getStory, getStoryPagination } from '../../../reducers/selectors'

import Story from './Story'

const mapStateToProps = (state) => ({
  items: getStory(state),
  pagination: getStoryPagination(state)
})

const mapDispatchToProps = (dispatch) => ({
  load: (url) => dispatch(loadStory(false, false, url)),
  refresh: (url) => dispatch(loadStory(false, true, url)),
  resetAndPlayTrack: (tracks, track) => dispatch(resetAndPlayTrack(tracks, track))
})

export default connect(mapStateToProps, mapDispatchToProps)(Story)
