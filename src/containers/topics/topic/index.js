import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { loadTopic, resetAndPlayTrack } from 'src/actions'
import { getTopic, getTopicPagination } from 'src/reducers/selectors'

import Topic from './Topic'

const mapStateToProps = (state) => ({
  items: getTopic(state),
  pagination: getTopicPagination(state)
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    loadTopic,
    resetAndPlayTrack
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Topic)
