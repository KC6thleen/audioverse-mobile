import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { loadBooks } from 'src/actions'
import { getBooks, getBooksPagination } from 'src/reducers/selectors'

import Books from './Books'

const mapStateToProps = (state) => ({
  items: getBooks(state),
  pagination: getBooksPagination(state)
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    loadBooks
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Books)
