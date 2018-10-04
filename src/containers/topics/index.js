import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { getTopics, getTopicsPagination } from 'src/reducers/selectors'
import { loadTopics } from 'src/actions'

import Topics from './Topics'

const mapStateToProps = (state) => ({
  items: getTopics(state),
  pagination: getTopicsPagination(state)
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    loadTopics
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Topics)
