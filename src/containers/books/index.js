import { connect } from 'react-redux'

import { loadBooks } from 'src/actions'
import { getBooks, getBooksPagination } from 'src/reducers/selectors'

import Books from './Books'

const mapStateToProps = (state) => ({
  items: getBooks(state),
  pagination: getBooksPagination(state)
})

const mapDispatchToProps = (dispatch) => ({
  load: () => dispatch(loadBooks(false, false)),
  loadMore: () => dispatch(loadBooks(true, false)),
  refresh: () => dispatch(loadBooks(false, true))
})

export default connect(mapStateToProps, mapDispatchToProps)(Books)
