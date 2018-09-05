import { connect } from 'react-redux'

import { loadBibleBooks, loadBibleChapters } from 'src/actions'
import { getBibleBooks, getBibleBooksPagination } from 'src/reducers/selectors'

import BibleBooks from './BibleBooks'

const mapStateToProps = (state) => ({
  items: getBibleBooks(state),
  pagination: getBibleBooksPagination(state)
})

const mapDispatchToProps = (dispatch) => ({
  load: () => dispatch(loadBibleBooks(false, false)),
  refresh: () => dispatch(loadBibleBooks(false, true)),
  loadBibleChapters: (testament, book) => dispatch(loadBibleChapters(false, false, testament, book)),
})

export default connect(mapStateToProps, mapDispatchToProps)(BibleBooks)
