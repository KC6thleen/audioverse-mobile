import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { loadStory, resetAndPlayTrack } from 'src/actions'
import { getStory, getStoryPagination } from 'src/reducers/selectors'

import Story from './Story'

const mapStateToProps = (state) => ({
  items: getStory(state),
  pagination: getStoryPagination(state)
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    loadStory,
    resetAndPlayTrack
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Story)
