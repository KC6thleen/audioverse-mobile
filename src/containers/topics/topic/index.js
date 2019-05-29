import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { loadTopic } from 'src/actions'
import { getTopic, getTopicPagination } from 'src/reducers/selectors'

import List from 'src/components/list'

const mapStateToProps = (state) => ({
  items: getTopic(state),
  pagination: getTopicPagination(state),
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    loadData: loadTopic,
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(List)
