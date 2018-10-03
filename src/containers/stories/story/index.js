import { connect } from 'react-redux'

import { loadStory, resetAndPlayTrack } from 'src/actions'
import { getStory, getStoryPagination } from 'src/reducers/selectors'

import Story from './Story'

const mapStateToProps = (state) => ({
  items: getStory(state),
  pagination: getStoryPagination(state)
})

const mapDispatchToProps = (dispatch) => ({
  load: (url) => dispatch(loadStory(false, false, url)),
  refresh: (url) => dispatch(loadStory(false, true, url)),
  resetAndPlayTrack: (tracks, id) => dispatch(resetAndPlayTrack(tracks, id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Story)
