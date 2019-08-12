import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'

import { AppState } from '../../../store'
import { loadTopic } from '../../../actions'
import { getTopic, getTopicPagination } from '../../../reducers/selectors'

import List from '../../../components/list'

const mapStateToProps = (state: AppState) => ({
  items: getTopic(state),
  pagination: getTopicPagination(state),
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({
    loadData: loadTopic,
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(List)
