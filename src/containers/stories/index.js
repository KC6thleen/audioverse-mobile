import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { loadStories } from 'src/actions'
import { getStories, getStoriesPagination } from 'src/reducers/selectors'

import Stories from './Stories'

const mapStateToProps = (state) => ({
  items: getStories(state),
  pagination: getStoriesPagination(state)
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    loadStories
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Stories)
