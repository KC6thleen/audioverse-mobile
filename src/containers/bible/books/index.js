import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { loadBibleBooks, loadBibleChapters } from 'src/actions'
import { getBibleBooks, getBibleBooksPagination, getBibleChapters } from 'src/reducers/selectors'

import BibleBooks from './BibleBooks'

const mapStateToProps = (state) => ({
  items: getBibleBooks(state),
  pagination: getBibleBooksPagination(state),
  chapters: getBibleChapters(state)
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    loadBibleBooks,
    loadBibleChapters
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(BibleBooks)
