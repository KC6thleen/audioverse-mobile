import { connect } from 'react-redux'

import { loadStories } from '../../actions'
import { getStories, getStoriesPagination } from '../../reducers/selectors'

import Stories from './Stories'

const mapStateToProps = (state) => ({
  items: getStories(state),
  pagination: getStoriesPagination(state)
})

const mapDispatchToProps = (dispatch) => ({
  load: () => dispatch(loadStories(false, false)),
  loadMore: () => dispatch(loadStories(true, false)),
  refresh: () => dispatch(loadStories(false, true))
})

export default connect(mapStateToProps, mapDispatchToProps)(Stories)
