import { connect } from 'react-redux'

import { getTopics, getTopicsPagination } from '../../reducers/selectors'
import { loadTopics } from '../../actions'

import Topics from './Topics'

const mapStateToProps = (state) => ({
  items: getTopics(state),
  pagination: getTopicsPagination(state)
})

const mapDispatchToProps = (dispatch) => ({
  load: () => dispatch(loadTopics(false, false)),
  loadMore: () => dispatch(loadTopics(true, false)),
  refresh: () => dispatch(loadTopics(false, true))
})

export default connect(mapStateToProps, mapDispatchToProps)(Topics)
